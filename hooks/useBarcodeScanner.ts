import throttle from "just-throttle";
import { BarcodeScanningResult } from "expo-camera";
import { checkAllHeuristics } from "@/services/checkAllHeuristics";
import { scanAlertSchema } from "@/constants/ScanConstants/scanAlertSchema";
import { NavigationContext } from "@/contexts/NavigationProvider";
import { 
    ExternalPathString, 
    UnknownInputParams 
} from "expo-router";
import { 
    useCallback, 
    useRef, 
    useState,
    useContext 
} from "react";
import { 
    areOriginalUrlAndHoppedSimilar,
    checkIfThereAreHops,
    checkIfIsValidURL,
} from "@/services/URLServices/checkUrl";
import {
    isUrlSafe,
    getUrlReportAnalysis,
    scanUrl,
} from "@/services/VirusTotalService/getUrlReport";

export function useBarcodeScanner () {
    const throttleDelay = 2000;
    const [obtainedURL, setObtainedURL] = useState("");
    const [scanData, setScanData] = useState(scanAlertSchema.info)
    const [isUrlShorten, setIsUrlShorten] = useState(false);
    const [isProcessing, setIsProcessing] = useState(false);
    const [hasRedirected, setHasRedirected] = useState(false);
    const navigationContext = useContext(NavigationContext);

    if (!navigationContext) {
        throw new Error("NavigationContext no está disponible.");
    }

    const { router } = navigationContext;

    const redirectToScreen = (path: string, sentParams: UnknownInputParams) => {
        setHasRedirected(true);
        const createdPath = path as ExternalPathString;
        router.replace({ pathname: createdPath, params: sentParams });
    }

    // No matter hoy many times the function is called, only invoke once withing the given interval
    const throttledSetObtainedURL = useRef(
        throttle(async (data: string) => {
            if (hasRedirected) return;

            setObtainedURL(data);
            setScanData({
                ...scanAlertSchema.scanned
            });
            
            setIsProcessing(true);

            try {
                const urlAfterCheckHops = await checkIfThereAreHops(data);

                if (!areOriginalUrlAndHoppedSimilar(data, urlAfterCheckHops)) {
                    setObtainedURL(urlAfterCheckHops);
                    setIsUrlShorten(true);
                    setScanData({
                        ...scanAlertSchema.shorten
                    });
                }

                const urlID = await scanUrl(urlAfterCheckHops);
                const results = await getUrlReportAnalysis(urlID);
                // Checking all heuristics to determine if the URL is suspicious
                const resultCheckHeuristics = checkAllHeuristics(results, data);
                
                if (!isUrlSafe(results)) {
                    redirectToScreen("/(results)/dangerscreen", { 
                        url: data, 
                        results: JSON.stringify(results),
                        heuristics: JSON.stringify(resultCheckHeuristics) 
                    });
                    return;
                } 

                if (resultCheckHeuristics.includes(true)) {
                    redirectToScreen("/(results)/suspiciousscreen", { 
                        url: data, 
                        heuristics: JSON.stringify(resultCheckHeuristics) 
                    });
                    return;
                }

                redirectToScreen("/(results)/safescreen", { url: results.last_final_url });
            } catch (error) {
                setScanData({
                    ...scanAlertSchema.failed
                });      
                console.error(error);
            } finally {
                setIsProcessing(false);
                setHasRedirected(false);
            }
        }, throttleDelay)
    ).current;

    const handleBarcodeScanner = useCallback(
         (scanningResult: BarcodeScanningResult) => {
            if (isProcessing || hasRedirected) return;
            const { data } = scanningResult;

            if (!checkIfIsValidURL(data)) {
                setObtainedURL("")
                setScanData({
                    ...scanAlertSchema.error
                });
                return;
            }

            throttledSetObtainedURL(data);
         }
    , [throttledSetObtainedURL, isProcessing, hasRedirected]);

    return { 
        obtainedURL, 
        scanData,
        isUrlShorten,
        handleBarcodeScanner 
    };
}

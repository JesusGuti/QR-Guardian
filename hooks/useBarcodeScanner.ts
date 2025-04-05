import throttle from "just-throttle";
import { BarcodeScanningResult } from "expo-camera";
import { scanAlertSchema } from "@/constants/scanAlertSchema";
import { NavigationContext } from "@/contexts/NavigationProvider";
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
} from "@/services/checkUrl";
import {
    checkIfDomainIsSuspicious,
    checkIfTLDIsRare
} from "@/services/checkDomainAndSubdomain"
import {
    isUrlSafe,
    getUrlReportAnalysis,
    scanUrl,
    isUrlSuspicious
} from "@/services/getUrlReport";

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

    // No matter hoy many times the function is called, only invoke once withing the given interval
    const throttledSetObtainedURL = useRef(
        throttle(async (data: string) => {
            if (hasRedirected) return;

            setObtainedURL(data);
            setScanData({
                ...scanAlertSchema.scanned
            })
            
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
            
                if (!isUrlSafe(results)) {
                    setHasRedirected(true);
                    router.replace({ pathname: "/(results)/dangerscreen", params: { url: data, results: JSON.stringify(results) } });
                    return;
                } 

                if (checkIfTLDIsRare(data) || checkIfDomainIsSuspicious(data) || isUrlSuspicious(results)) {
                    setHasRedirected(true);
                    router.replace({ pathname: "/(results)/suspiciousscreen", params: { url: data, results: JSON.stringify(results) } });
                    return;
                }

                setHasRedirected(true);
                router.replace({ pathname: "/(results)/safescreen", params: { url: results.last_final_url } });
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

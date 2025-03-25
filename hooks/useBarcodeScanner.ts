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
    checkIfTLDIsRare,
    checkIfDomainIsSuspicious
} from "@/services/checkUrl";
import {
    isUrlSafe,
    getUrlReportAnalysis,
    scanUrl
} from "@/services/getUrlReport";

export function useBarcodeScanner () {
    const throttleDelay = 4000;
    const [obtainedURL, setObtainedURL] = useState("");
    const [scanData, setScanData] = useState(scanAlertSchema.info)
    const [isUrlShorten, setIsUrlShorten] = useState(false);
    const navigationContext = useContext(NavigationContext);

    if (!navigationContext) {
        throw new Error("NavigationContext no está disponible.");
    }

    const { router } = navigationContext;

    // No matter hoy many times the function is called, only invoke once withing the given interval
    const throttledSetObtainedURL = useRef(
        throttle((data: string) => {
            setObtainedURL(data);
            setScanData({
                ...scanAlertSchema.scanned
            })

            setTimeout(async () => {
                const urlAfterCheckHops = await checkIfThereAreHops(data);

                if (!areOriginalUrlAndHoppedSimilar(data, urlAfterCheckHops)) {
                    setObtainedURL(urlAfterCheckHops);
                    setIsUrlShorten(true);
                    setScanData({
                        ...scanAlertSchema.shorten
                    })
                }

                const urlID = await scanUrl(urlAfterCheckHops);
                const results = await getUrlReportAnalysis(urlID);
    
                if (!isUrlSafe(results)) {
                    router.replace({ pathname: "/(results)/dangerscreen", params: { url: data, results: JSON.stringify(results) } });
                    return;
                } 

                if (checkIfTLDIsRare(data) || checkIfDomainIsSuspicious(data)) {
                    router.replace({ pathname: "/(results)/suspiciousscreen", params: { url: data, results: JSON.stringify(results) } });
                    return;
                }

                router.replace({ pathname: "/(results)/safescreen", params: { url: results.last_final_url } });
            }, 1500)
             
        }, throttleDelay)
    ).current;

    const handleBarcodeScanner = useCallback(
         (scanningResult: BarcodeScanningResult) => {
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
    , [throttledSetObtainedURL]);

    return { 
        obtainedURL, 
        scanData,
        isUrlShorten,
        handleBarcodeScanner 
    };
}

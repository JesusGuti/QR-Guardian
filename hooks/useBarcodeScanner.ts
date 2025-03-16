import throttle from "just-throttle";
import { BarcodeScanningResult } from "expo-camera";
import { scanAlertSchema } from "@/constants/scanAlertSchema";
import { 
    useCallback, 
    useRef, 
    useState 
} from "react";
import { 
    areOriginalUrlAndHoppedSimilar,
    checkIfThereAreHops,
    checkIfIsValidURL
} from "@/services/checkUrl";

export function useBarcodeScanner () {
    const throttleDelay = 4000;
    const [obtainedURL, setObtainedURL] = useState("");
    const [scanData, setScanData] = useState(scanAlertSchema.info)
    const [isUrlShorten, setIsUrlShorten] = useState(false);

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

                // await analyzeUrlAndRedirect(urlAfterCheckHops);
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

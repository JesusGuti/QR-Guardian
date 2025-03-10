import { 
    useCallback, 
    useRef, 
    useState 
} from "react";
import { BarcodeScanningResult } from "expo-camera";
import { scanAlertSchema } from "@/constants/scanAlertSchema";
import { 
    areOriginalUrlAndHoppedSimilar,
    checkIfThereAreHops,
    checkStartPattern, 
} from "@/services/checkUrl";
import throttle from "just-throttle";

export function useBarcodeScanner () {
    const throttleDelay = 5000;
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
            }, 1000)
             
        }, throttleDelay)
    ).current;

    const handleBarcodeScanner = useCallback(
         (scanningResult: BarcodeScanningResult) => {
            const { data } = scanningResult;

            if (!checkStartPattern(data)) {
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

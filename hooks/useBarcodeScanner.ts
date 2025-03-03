import { 
    useCallback, 
    useRef, 
    useState 
} from "react";
import { BarcodeScanningResult } from "expo-camera";
import { scanAlertSchema } from "@/constants/scanAlertSchema";
import { checkStartPattern } from "@/services/link";
import throttle from "just-throttle";

export function useBarcodeScanner () {
    const throttleDelay = 200;
    const [obtainedURL, setObtainedURL] = useState("");
    const [scanData, setScanData] = useState(scanAlertSchema.info)

    // No matter hoy many times the function is called, only invoke once withing the given interval
    const throttledSetObtainedURL = useRef(
        throttle((data: string) => {
            setObtainedURL(data);
            setScanData({
                ...scanAlertSchema.scanned
            })
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
        handleBarcodeScanner 
    };
}

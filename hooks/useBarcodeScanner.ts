import { 
    useCallback, 
    useRef, 
    useState 
} from "react";
import { BarcodeScanningResult } from "expo-camera";
import throttle from "just-throttle";

export function useBarcodeScanner () {
    const throttleDelay = 200;
    const [obtainedURL, setObtainedURL] = useState("");

    // No matter hoy many times the function is called, only invoke once withing the given interval
    const throttledSetObtainedURL = useRef(
        throttle((data: string) => {
            console.log(data)
            setObtainedURL(data);
        }, throttleDelay)
    ).current;

    const handleBarcodeScanner = useCallback(
         (scanningResult: BarcodeScanningResult) => {
            const { data } = scanningResult;
            throttledSetObtainedURL(data);
         }
    , [throttledSetObtainedURL])

    return { obtainedURL, handleBarcodeScanner }
}

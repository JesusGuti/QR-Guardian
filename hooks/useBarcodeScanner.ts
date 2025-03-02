import { useCallback, useState } from "react";
import { BarcodeScanningResult } from "expo-camera";
import debounce from "just-debounce-it";

export function useBarcodeScanner () {
    const debounceDelay = 100;
    const [obtainedURL, setObtainedURL] = useState("");

    const handleBarcodeScanner = useCallback(
        debounce((scanningResult: BarcodeScanningResult) => {
            const { data } = scanningResult
            setObtainedURL(data)
        }, debounceDelay)   
    , [debounceDelay])

    return { obtainedURL, handleBarcodeScanner }
}

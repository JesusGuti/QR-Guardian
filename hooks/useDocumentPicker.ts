import { getDocumentAsync } from "expo-document-picker";
import { NavigationContext } from "@/contexts/NavigationProvider";
import { 
    BarcodeScanningResult, 
    scanFromURLAsync 
} from "expo-camera";
import {
    useState,
    useEffect,
    useContext
} from "react";

const MIN_NUMBER_OF_FILES = 0;

export function useDocumentPicker () {
    const [showMessageError, setShowMessageError] = useState<boolean>(false);
    const navigationContext = useContext(NavigationContext);
    
    if (!navigationContext) {
        throw new Error("NavigationContext no está disponible.");
    }

    const { router } = navigationContext;

    useEffect(() => {
        if (showMessageError) {
            setTimeout(() => {
                setShowMessageError(false);
            }, 5000);
        }
    }, [showMessageError]);

    const pickImageAndScan = async (): Promise<void> => {
        try {
            // Get a file from filesystem
            const result = await getDocumentAsync({
                type: ["image/*", "svg"]
            });

            if (result.assets?.length && result.assets?.length > MIN_NUMBER_OF_FILES) {
                const resultUri = result.assets[MIN_NUMBER_OF_FILES].uri;
                // Obtain QR information if it exists
                const scannedData = await scanQR(resultUri);
                
                if (typeof scannedData === 'string') {
                    setShowMessageError(true);
                    return;
                }

                router.push({
                    pathname: '/(scanQR)/scanfromimage',
                    params: { 
                        uri: resultUri, 
                        qrdata: JSON.stringify(scannedData)
                    }
                })
            }
        } catch (error) {
            console.error('Error al seleccionar una imagen.', error);
        }
    };

    const scanQR = async (uri: string): Promise<BarcodeScanningResult | string>  => {
        try {
            // Using scanner from expo-camera
            const scanQRCode = await scanFromURLAsync(uri, ['qr']);

            // If QR exists it should navigate to route
            if (scanQRCode && scanQRCode.length > MIN_NUMBER_OF_FILES) {
                const qrData = scanQRCode[MIN_NUMBER_OF_FILES];
                return qrData;
            }

            return 'La imagen no tiene un código QR.'
        } catch (error) {
            console.error('Error al escanear código QR.', error)
            return 'Error al escanear código QR.'
        }
    }

    return { pickImageAndScan, showMessageError };
}

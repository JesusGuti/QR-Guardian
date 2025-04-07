import { getDocumentAsync } from "expo-document-picker";
import { Image } from "react-native";
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
import {
    ImageManipulator,
    ImageResult,
    SaveFormat
} from "expo-image-manipulator";

const MIN_NUMBER_OF_FILES = 0;
const MARGIN_SIZE = 50;

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

                const onlyQRCodeImage = await getQRCodeFromImage(resultUri, scannedData);

                router.push({
                    pathname: '/(scanQR)/scanfromimage',
                    params: { 
                        uri: onlyQRCodeImage?.uri ?? resultUri, 
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
            const scanQRCode: BarcodeScanningResult[] = await scanFromURLAsync(uri, ['qr']);

            // If QR exists it should navigate to route
            if (scanQRCode && scanQRCode.length > MIN_NUMBER_OF_FILES) {
                const qrData = scanQRCode[MIN_NUMBER_OF_FILES];                
                return qrData;
            }

            return 'La imagen no tiene un código QR.'
        } catch (error) {
            throw new Error(`Ocurrio un error al escanear la imagen${error}`);
        }
    }

    const getQRCodeFromImage = async (uri: string, QRCodeInformation: BarcodeScanningResult): Promise<ImageResult | null> => {
        // Obtaining bounds to calculate QRcode position and size
        const { bounds } = QRCodeInformation;

        // Obtaining dimensions of original image
        const { width, height } = await Image.getSize(uri);        

        // Obtaining dimensions of QRcode
        const QRWidth = bounds.size.width + (MARGIN_SIZE * 2);
        const QRHeight = bounds.size.height + (MARGIN_SIZE * 2);
        const QROriginX = bounds.origin.x - MARGIN_SIZE;
        const QROriginY = bounds.origin.y - MARGIN_SIZE;

        // Checking if is necessary to crop image
        if (QRWidth > width || QRHeight > height) return null;

        // Cutting image to get only QRcode
        const manipulateImage = ImageManipulator.manipulate(uri)
        
        const croppedImage = await manipulateImage.crop(
            {
                height: QRHeight,
                originX: QROriginX,
                originY: QROriginY,
                width: QRWidth
            }
        ).renderAsync();
        // Saving cropped image 
        const result = await croppedImage.saveAsync({
            format: SaveFormat.PNG
        })

        return result;
        
    }

    return { pickImageAndScan, showMessageError };
}

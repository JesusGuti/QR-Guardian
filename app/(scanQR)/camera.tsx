import { 
    View, 
    StyleSheet,
    Text,
} from "react-native"
import { CameraView } from "expo-camera"
import { useCameraPermission } from "@/hooks/useCameraPermission";
import { useBarcodeScanner } from "@/hooks/useBarcodeScanner";
import Overlay from "@/components/ScanComponents/Overlay";
import CameraBorder from "@/components/ScanComponents/CameraBorder";
import BackButton from "@/components/ui/BackButton";
import ScanAlert from "@/components/ScanComponents/ScanAlert";
import ScanLine from "@/components/ScanComponents/ScanLine";
import PermissionView from "@/components/ScanComponents/PermissionView";

export default function Camera () {
    const { 
        facing, 
        permission, 
        requestCameraPermission 
    } = useCameraPermission()
    const { 
        obtainedURL, 
        scanData,
        handleBarcodeScanner 
    } = useBarcodeScanner()

    if (!permission) {
        return <View />;
    }
    
    if (!permission.granted) {
        // Camera permissions are not granted yet.
        return <PermissionView requestPermission={requestCameraPermission} />;
    }
    
    return (
        <View style={styles.container}>
            <BackButton route='../' />
            <Text style={styles.url}>{obtainedURL}</Text>
            <Overlay />
            <CameraBorder />
            <CameraView 
                barcodeScannerSettings={{
                    barcodeTypes: ["qr"]
                }} 
                onBarcodeScanned={ handleBarcodeScanner }
                style={styles.camera} 
                facing={facing} /> 
            <ScanAlert 
                scanStatus={scanData.scanStatus}
                iconRoute={scanData.icon}
                alertMessage={scanData.message}
            />
            <ScanLine />
        </View>
    );
}
    
export const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignContent: 'center',
        position: 'relative',
        textAlign: 'center'
    },

    camera: {
        flex: 1,
    },

    url: {
        position: 'absolute',
        top: '15%',
        left: '15%',
        width: 300,
        color: '#fff',
        textDecorationLine: 'underline',
        fontSize: 20,
        zIndex: 2
    }
});

import { 
    View, 
    StyleSheet,
    Text,
    Button,
} from "react-native"
import { 
    useCameraPermissions, 
    CameraView,
    CameraType, 
} from "expo-camera"
import { useState } from "react";
import Overlay from "@/components/ui/Overlay";
import CameraBorder from "@/components/ui/CameraBorder";
import BackButton from "@/components/BackButton";
import ScanAlert from "@/components/ui/ScanAlert";
import ScanLine from "@/components/ui/ScanLine";

export default function Camera () {
    // Define the back camera
    const [facing, setFacing] = useState<CameraType>('back');
    // Hook to obtain permission
    const [permission, requestPermission] = useCameraPermissions();
    
    if (!permission) {
        // Camera permissions are still loading.
        return <View />;
    }
    
    if (!permission.granted) {
        // Camera permissions are not granted yet.
        return (
          <View style={styles.container}>
            <BackButton route='../' />
            <Text style={styles.message}>Dar permiso a la ca&cute;mara</Text>
            <Button onPress={requestPermission} title="Dar permiso a la c&aacute;mara" />
          </View>
        );
    }
    
    return (
        <View style={styles.container}>
            <BackButton route='../' />
            <Overlay />
            <CameraBorder />
            <CameraView 
                style={styles.camera} 
                facing={facing}> 
            </CameraView>
            <ScanAlert />
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
        position: 'relative'
    },

    message: {
        textAlign: 'center',
        paddingBottom: 10,  
        color: '#fff'
    },

    camera: {
        flex: 1,
    },
});

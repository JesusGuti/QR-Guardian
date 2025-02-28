import { 
    View, 
    StyleSheet,
    Text,
    Button
} from "react-native"
import { 
    useCameraPermissions, 
    CameraView,
    CameraType, 
} from "expo-camera"
import { useState } from "react";

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
            <Text style={styles.message}>Dar permiso a la ca&cute;mara</Text>
            <Button onPress={requestPermission} title="grant permission" />
          </View>
        );
    }
    

    return (
        <View style={styles.container}>
            <View style={styles.overlay}>
                <View style={styles.maskTop}></View>
                <View style={styles.maskMiddle}>
                    <View style={styles.maskSide}></View>
                    <View style={styles.hole}></View>
                    <View style={styles.maskSide}></View>
                </View>
                <View style={styles.maskBottom}></View>
                <View></View>
            </View>
            <CameraView 
                    style={styles.camera} 
                    facing={facing}> 
            </CameraView>
        </View>
    );
}
    
const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        position: 'relative'
    },

    message: {
        textAlign: 'center',
        paddingBottom: 10,  
    },

    overlay: {
        position: 'absolute',
        backgroundColor: 'transparent',
        width: '100%',
        height: '100%',
        zIndex: 1,
    },

    maskTop: {
        width: '100%',
        height: '35%',
        backgroundColor: 'rgba(0, 0, 0, 0.8)'
    },

    maskMiddle: {
        flexDirection: 'row',
        width: '100%',
        height: '30%', 
      },
    
      maskSide: {
        width: '20%', 
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
      },
    
      hole: {
        flex: 1, 
      },
    
      maskBottom: {
        width: '100%',
        height: '35%', // Parte inferior oscura
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
      },

    camera: {
        flex: 1,
    },
});

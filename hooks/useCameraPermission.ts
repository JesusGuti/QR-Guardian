import { 
    useState,
    useCallback
} from "react"
import { 
    useCameraPermissions, 
    CameraType, 
} from "expo-camera"

export function useCameraPermission () {
    // Define the back camera
    const [facing] = useState<CameraType>('back');
    // Hook to obtain permission
    const [permission, requestPermission] = useCameraPermissions();

    const requestCameraPermission = useCallback(() => {
        requestPermission()
    }, [requestPermission]);

    return { facing, permission, requestCameraPermission}
}

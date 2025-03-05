import { 
    Animated, 
    StyleSheet,
    Dimensions
} from "react-native";
import {
    useRef,
    useEffect
} from "react"

const { width, height } = Dimensions.get("window");
const SCANNING_AREA_SIZE = width * 0.7;
const SCANNING_HEIGHT_START = height * 0.33

export default function ScanLine () {
    const scanLineAnim = useRef(new Animated.Value(0)).current;
    
    useEffect(() => {
        Animated.loop(
            Animated.sequence([
                Animated.timing(scanLineAnim, {
                    toValue: 1,
                    duration: 2000,
                    useNativeDriver: true
                }),
                Animated.timing(scanLineAnim, {
                    toValue: 0,
                    duration: 2000,
                    useNativeDriver: true,
                })
            ])
        ).start();
    }, [scanLineAnim]);

    return (
        <Animated.View 
            style={[
                styles.scanLine,
                {
                    transform: [{
                        translateY: scanLineAnim.interpolate({
                            inputRange: [0, 1],
                            outputRange: [0, SCANNING_HEIGHT_START],
                            }),
                    }]
                }
            ]}
        />
    );
}

const styles = StyleSheet.create({
    scanLine: {
        height: 3,
        width: SCANNING_AREA_SIZE - 15,
        top: SCANNING_HEIGHT_START,
        left: '16.25%',
        backgroundColor: '#2196F3',
        position: 'absolute',
        zIndex: 2
    }
});

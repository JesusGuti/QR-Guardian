import { 
    Image,
    Text,
    StyleSheet 
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { PropsWithChildren } from "react";
import { getImageByRoute } from "@/services/getImageByRoute";
import { 
    redGradient,
    blueGradient
 } from "@/constants/ScanConstants/gradientSchema";

type Props = PropsWithChildren<{
    scanStatus: string
    iconRoute: string
    alertMessage: string
}>

export default function ScanAlert ({
    scanStatus,
    iconRoute,
    alertMessage
}: Props) {
    const imageSource = getImageByRoute(iconRoute)
    
    if (scanStatus === "error") {
        return (
            <LinearGradient 
                colors={redGradient.colors}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                locations={redGradient.locations}
                style={styles.scanState}
            >
                <Image source={imageSource} style={{ width: 36, height: 36 }} />
                <Text style={styles.scanText}>{alertMessage}</Text>
            </LinearGradient>
        );
    }

    return (
        <LinearGradient 
                colors={blueGradient.colors}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                locations={blueGradient.locations}
                style={styles.scanState}
        >
            <Image source={imageSource} style={{ width: 36, height: 36 }} />
            <Text style={styles.scanText}>{alertMessage}</Text>
        </LinearGradient>
    );
}

const styles = StyleSheet.create({
    scanState: {
        position: 'absolute',
        width: 290,
        height: 60,
        padding: 5,
        bottom: 100,
        left: '15%',
        zIndex: 2,
        borderRadius: 10,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center'
    },

    scanText: {
        color: '#fff',
        fontWeight: 600,
        marginLeft: -15
    }
});

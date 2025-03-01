import { 
    Image,
    Text,
    StyleSheet 
} from "react-native"
import { LinearGradient } from "expo-linear-gradient";

export default function ScanAlert () {
    return (
        <LinearGradient 
            colors={['rgba(19, 87, 141, 0.31)', 'rgba(33, 150, 243, 0.40)']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            locations={[0.5, 1.0]}
            style={styles.scanState}
        >
            <Image source={require('@/assets/images/scan.png')} style={{ width: 48, height: 48}} />
            <Text style={styles.scanText}>Escaneando c&oacute;digo QR...</Text>
        </LinearGradient>
    )
}

const styles = StyleSheet.create({
    scanState: {
        position: 'absolute',
        width: '70%',
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
        marginLeft: -30
    }
});

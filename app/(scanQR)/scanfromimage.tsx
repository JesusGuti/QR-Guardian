import {
    View,
    Image,
    StyleSheet,
    Text
} from 'react-native';
import { useSearchParamsFromImage } from "@/hooks/useSearchParamsFromImage";
import BackButton from "@/components/ui/BackButton";
import ScanAlert from "@/components/ScanComponents/ScanAlert";

export default function ScanFromImage () {
    const { 
        uri,
        obtainedURL,
        scanData
    } = useSearchParamsFromImage()

    return (
        <View style={styles.container}>
            <BackButton route='../' />
            <Text style={styles.url}>{obtainedURL}</Text>
            <Image source={{ uri: uri.toString() }} style={styles.image} />
            <ScanAlert 
                scanStatus={scanData.scanStatus}
                iconRoute={scanData.icon}
                alertMessage={scanData.message}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
    },

    url: {
        color: '#fff',
        fontSize: 20,
        textDecorationLine: 'underline',
        marginBottom: 50
    },

    image: {
        width: 290,
        height: 290,
        marginBottom: 40
    },
})

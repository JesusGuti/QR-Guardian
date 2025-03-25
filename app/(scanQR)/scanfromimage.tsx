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
        scanData,
        isUrlShorten
    } = useSearchParamsFromImage()

    return (
        <View style={styles.container}>
            <BackButton route='../' />
            {isUrlShorten && <Text style={styles.shorten}>URL ACORTADA</Text>}
            <Text style={styles.url} numberOfLines={4}>{obtainedURL}</Text>
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
        backgroundColor: '#000'
    },

    shorten: {
        position: 'absolute',
        top: '12%',
        fontSize: 30,
        fontWeight: 600,
        color: 'rgba(33, 150, 243, 0.7)'
    },

    url: {
        color: '#fff',
        fontSize: 20,
        textDecorationLine: 'underline',
        position: 'absolute',
        top: '20%',
        width: 350,
        textAlign: 'center'
    },

    image: {
        position: 'absolute',
        top: '35%',
        width: 290,
        height: 290,
        marginBottom: 40
    },
})

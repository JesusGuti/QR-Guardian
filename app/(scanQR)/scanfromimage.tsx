import {
    View,
    Image,
    StyleSheet,
    Text
} from 'react-native';
import { useLocalSearchParams } from 'expo-router';

export default function ScanFromImage () {
    const { uri, qrdata } = useLocalSearchParams()

    return (
        <View>
            <Image source={{ uri: uri }} style={styles.image} />
            <Text style={styles.text}>HOLA CTM</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },

    image: {
        width: 300,
        height: 300,
        marginBottom: 20
    },

    text: {
        color: '#fff'
    }
})

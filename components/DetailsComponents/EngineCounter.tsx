import { PropsWithChildren } from "react";
import { 
    View,
    Text,
    StyleSheet
} from "react-native";

type Props = PropsWithChildren<{
    maliciousScans: number
    numberOfScans: number
}>

export default function EngineCounter ({ maliciousScans, numberOfScans }: Props) {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Conteo de detecciones</Text>
            <View style={styles.boxCount}>
                <Text style={styles.boxCountText}>{`${maliciousScans}/${numberOfScans}`}</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        width: 300,
        justifyContent: 'space-between',
        padding: 5
    },

    title: {
        color: '#fff',
        fontSize: 20,
        fontWeight: 700,
    },

    boxCount: {
        backgroundColor: '#fff',
        padding: 10,
        borderRadius: 10,
        marginLeft: 40
    }, 
    
    boxCountText: {
        fontSize:20,
        fontWeight: 800,
        color: 'rgb(255, 138, 128)',
    }
});

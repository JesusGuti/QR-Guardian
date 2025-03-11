import { LinearGradient } from "expo-linear-gradient";
import { dangerGradient } from "@/constants/gradientSchema";
import {
    Pressable,
    StyleSheet,
    Text
} from "react-native"
import BackButton from "@/components/ui/BackButton";
import AlertIcon from "@/assets/svg/AlertIcon";

export default function DangerScreen () {
    return (
        <LinearGradient
            colors={dangerGradient.colors}
            locations={dangerGradient.locations}
            style={styles.gradient

            }
        >
            <BackButton route="../" />
            <AlertIcon />
            <Text style={styles.alertText}>¡Alerta Potencial de Seguridad!</Text>
            <Text style={styles.description}>El c&oacute;digo QR escaneado puede ser un caso de quishing</Text>
            <Pressable style={styles.button}>
                <Text style={styles.buttonText}>Ver detalles</Text>
            </Pressable>
        </LinearGradient>
    );
}

const styles = StyleSheet.create({
    gradient: {
        width: '100%',
        height: '100%',
        display: 'flex',
        alignItems: 'center'
    },

    alertText: {
        color: '#fff',
        fontSize: 20,
        fontWeight: 800,
        marginBottom: 10
    },

    description: {
        width: 300,
        fontSize: 16,
        color: '#fff',
        textAlign: 'center',
        marginBottom: 30
    },

    button: {
        backgroundColor: '#fff',
        width: 180,
        padding: 16,
        borderRadius: 10
    },

    buttonText: {
        color: 'rgba(255, 138, 128, 1)',
        fontSize: 20,
        fontWeight: 600,
        marginLeft: 'auto',
        marginRight: 'auto'
    }
})

import { dangerGradient } from "@/constants/gradientSchema";
import {
    StyleSheet,
    Text
} from "react-native"
import { ResultButton } from "@/components/ResultsComponents/ResultButton";
import AlertIcon from "@/assets/svg/AlertIcon";
import ResultBackground from "@/components/ResultsComponents/ResultBackground";

export default function DangerScreen () {
    return (
        <ResultBackground
            colors={dangerGradient.colors}
            locations={dangerGradient.locations}
            >
            <AlertIcon />
            <Text style={styles.alertText}>¡Alerta Potencial de Seguridad!</Text>
            <Text style={styles.description}>El c&oacute;digo QR escaneado puede ser un caso de quishing</Text>
            <ResultButton 
                handlePress={() => {}}
                buttonText="Ver detalles"
                buttonStyle={null}
                textStyle={styles.buttonText}
            />
        </ResultBackground>
    );
}

const styles = StyleSheet.create({
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

    buttonText: {
        color: 'rgba(255, 138, 128, 1)',
    }
});

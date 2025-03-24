import ResultBackground from "@/components/ResultsComponents/ResultBackground";
import suspiciousIcon from "@/assets/images/suspicious-icon.png"
import { suspiciousGradient } from "@/constants/gradientSchema";
import { ResultButton } from "@/components/ResultsComponents/ResultButton";
import { useLocalSearchParams } from "expo-router";
import { 
    Image,
    StyleSheet, 
    Text, 
    Linking 
} from "react-native";

export default function SuspiciousScreen () {   
    const { url } = useLocalSearchParams();
    
        const handlePress = () => {
            Linking.openURL(url.toString()).catch(err => console.error("Ocurrio un error al abrir el enlace", err));
        }
        
        return (
            <ResultBackground
                colors={suspiciousGradient.colors}
                locations={suspiciousGradient.locations}
                showButton={true}
            >
                <Image source={suspiciousIcon} style={styles.suspiciousIcon} />
                <Text style={styles.alertText}>C&oacute;digo QR sospechoso</Text>
                <Text style={styles.description}>El c&oacute;digo QR escaneado puede ser un caso de quishing. ¡Tenga Cuidado!</Text>

                <ResultButton 
                    handlePress={handlePress}
                    buttonText="Acceder a enlace"
                    buttonStyle={""}
                    textStyle={styles.buttonText}
                />
            </ResultBackground>      
        );
}

const styles = StyleSheet.create({
    suspiciousIcon: {
        width: 192, 
        height: 192,
        marginTop: 100,
        marginBottom: 20

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

    buttonText: {
        color: 'rgba(255, 138, 128, 1)',
    }
});

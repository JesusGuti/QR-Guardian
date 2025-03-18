import CheckedShieldIcon from "@/assets/svg/CheckedShieldIcon";
import ResultBackground from "@/components/ResultsComponents/ResultBackground";
import { safeGradient } from "@/constants/gradientSchema";
import { ResultButton } from "@/components/ResultsComponents/ResultButton";
import { useLocalSearchParams } from "expo-router";
import { 
    StyleSheet, 
    Text, 
    Linking 
} from "react-native";

export default function SafeScreen () {
    const { url } = useLocalSearchParams();

    const handlePress = () => {
        Linking.openURL(url.toString()).catch(err => console.error("Ocurrio un error al abrir el enlace", err));
    }
    
    return (
        <ResultBackground
            colors={safeGradient.colors}
            locations={safeGradient.locations}
            showButton={true}
        >
            <CheckedShieldIcon />
            <Text style={styles.text}>C&oacute;digo QR seguro</Text>
            <ResultButton 
                handlePress={handlePress}
                buttonText="Acceder a enlace"
                buttonStyle={styles.button}
                textStyle={styles.buttonText}
            />
        </ResultBackground>      
    );
}

const styles = StyleSheet.create({
    text: {
        color: '#fff',
        fontSize: 20,
        fontWeight: 600
    },

    button: {
        marginTop: 50
    },

    buttonText: {
        color: 'rgba(102, 187, 106, 1)',
    }
});

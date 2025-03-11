import { LinearGradient } from "expo-linear-gradient";
import { safeGradient } from "@/constants/gradientSchema";
import { 
    Pressable,
    StyleSheet, 
    Text, 
    Linking 
} from "react-native";
import BackButton from "@/components/ui/BackButton";
import  CheckedShieldIcon from "@/assets/svg/CheckedShieldIcon";

export default function SafeScreen () {
    const url = "https://youtube.com";

    const handlePress = () => {
        Linking.openURL(url).catch(err => console.error("Ocurrio un error al abrir el enlace", err));
    }
    
    return (
        <LinearGradient
            colors={safeGradient.colors}
            locations={safeGradient.locations}
            style={styles.gradient}
        >
            <BackButton route="../" /> 
            <CheckedShieldIcon />
            <Text style={styles.text}>C&oacute;digo QR seguro</Text>
            <Pressable 
                onPress={handlePress}    
                style={styles.accessButton}
            >
                <Text style={styles.buttonText}>Acceder a enlace</Text>
            </Pressable>
        </LinearGradient>        
    );
}

const styles = StyleSheet.create({
    gradient: {
        height: '100%',
        width: '100%',
        display: 'flex',
        alignItems: 'center',
    }, 
    
    text: {
        color: '#fff',
        fontSize: 20,
        fontWeight: 600
    },

    accessButton: {
        backgroundColor: '#fff',
        width: 200,
        padding: 10,
        borderRadius: 10, 
        marginTop: 50
    },

    buttonText: {
        fontSize: 20,
        fontWeight: 600,
        color: 'rgba(102, 187, 106, 1)',
        marginLeft: 'auto',
        marginRight: 'auto'
    }
})

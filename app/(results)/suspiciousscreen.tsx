import AlertText from "@/components/ResultsComponents/AlertText";
import Description from "@/components/ResultsComponents/Description";
import ResultBackground from "@/components/ResultsComponents/ResultBackground";
import suspiciousIcon from "@/assets/images/suspicious-icon.png"
import { suspiciousGradient } from "@/constants/gradientSchema";
import { ResultButton } from "@/components/ResultsComponents/ResultButton";
import { 
    Image,
    StyleSheet, 
    Text, 
    View 
} from "react-native";
import { useShowSuspiciousDetails } from "@/hooks/useShowSuspiciousDetails";
import IsSuspiciousCheckbox from "@/components/ResultsComponents/IsSuspiciousCheckbox";

export default function SuspiciousScreen () {   
    const { 
        url, 
        handlePress,
        isDomainChecked,
        isTLDChecked 
    } = useShowSuspiciousDetails();

    return (
        <ResultBackground
            colors={suspiciousGradient.colors}
            locations={suspiciousGradient.locations}
            showButton={true}
        >
            <Image source={suspiciousIcon} style={styles.suspiciousIcon} />
            <AlertText text={"Código QR sospechoso"} />
            <Description text={"El código QR escaneado puede ser un caso de quishing."} />
            <Text style={styles.alert}>¡Tenga Cuidado!</Text>

            <View style={styles.urlContainer}>
                <AlertText text={"URL escaneada:"} />
                <Text style={styles.url}>{url}</Text>
            </View>

            <IsSuspiciousCheckbox text={"¿TLD sospechoso?"} checked={isDomainChecked} />
            <IsSuspiciousCheckbox text={"¿Dominio sospechoso?"} checked={isTLDChecked} />
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
    suspiciousIcon: {
        width: 192, 
        height: 192,
        marginTop: 50,
        marginBottom: 20

    },

    alert: {
        fontSize: 22,
        color: '#fff',
        textAlign: 'center',
        fontWeight: 800,
        marginTop: -15,
        marginBottom: 20
    },

    urlContainer: {
        width: 400,
        alignItems: 'center',
        marginBottom: 20,
        textAlign: 'center'
    },

    url: {
        color: '#fff',
        fontSize: 18,
    },

    button: {
        marginTop: 30
    },

    buttonText: {
        color: 'rgb(255, 213, 0)',
    },
});

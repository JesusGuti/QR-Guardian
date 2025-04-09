import AlertText from "@/components/ResultsComponents/AlertText";
import Description from "@/components/ResultsComponents/Description";
import IsSomethingCheckbox from "@/components/ResultsComponents/IsSomethingCheckbox";
import ResultBackground from "@/components/ResultsComponents/ResultBackground";
import suspiciousIcon from "@/assets/images/suspicious-icon.png"
import { suspiciousGradient } from "@/constants/ScanConstants/gradientSchema";
import { ResultButton } from "@/components/ResultsComponents/ResultButton";
import { useShowSuspiciousDetails } from "@/hooks/useShowSuspiciousDetails";
import { 
    Image,
    StyleSheet, 
    Text, 
    View 
} from "react-native";

const checkboxColor = suspiciousGradient.colors[0];
const containerWidth = 320;

export default function SuspiciousScreen () {   
    const { 
        url, 
        handlePress,
        isDomainChecked,
        isTLDChecked,
        isScannedChecked,
        isDomainTyposquattingChecked,
        isSubdomainTyposquattingChecked
    } = useShowSuspiciousDetails();

    const highlightSuspiciousPart = () => {
        try {
            const urlObject = new URL(url);
            const { hostname, protocol, pathname } = urlObject;
            const splittedDomain = hostname.split(".");
            const TLD = splittedDomain.pop();
            const domain = splittedDomain.pop();

            return (
                <Text style={styles.url}>
                    {protocol}//
                    <Text style={(isDomainChecked || isSubdomainTyposquattingChecked) ? styles.suspiciousPart : styles.url}>{splittedDomain.length > 0 ?  `${splittedDomain.join(".")}.` : ""}</Text>
                    <Text style={(isDomainChecked || isDomainTyposquattingChecked) ? styles.suspiciousPart : styles.url}>{domain}.</Text>
                    <Text style={isTLDChecked ? styles.suspiciousPart : styles.url}>{TLD}</Text>
                    {pathname}
                </Text>
            );
        } catch (error) {
            throw new Error(`Error al resaltar la parte sospechosa de la URL ${error}`);
        }
    };

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
                <Text style={styles.url}>{highlightSuspiciousPart()}</Text>
            </View>

            <IsSomethingCheckbox 
                text={"¿TLD sospechoso?"} 
                checked={isTLDChecked} 
                checkboxColor={checkboxColor} 
                containerWidth={containerWidth}
            />
            <IsSomethingCheckbox 
                text={"¿Dominio sospechoso?"} 
                checked={isDomainChecked} 
                checkboxColor={checkboxColor} 
                containerWidth={containerWidth}
            />
            <IsSomethingCheckbox 
                text={"¿Es un caso de typosquatting?"} 
                checked={isDomainTyposquattingChecked || isSubdomainTyposquattingChecked} checkboxColor={checkboxColor} 
                containerWidth={containerWidth}
            />
            <IsSomethingCheckbox 
                text={"¿Detectado por algún motor?"} 
                checked={isScannedChecked} 
                checkboxColor={checkboxColor} 
                containerWidth={containerWidth}
            />
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
        marginTop: 20,
        marginBottom: 10
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

    suspiciousPart: {
        color: '#F28F51',
        fontSize: 18,
        fontWeight: '800'
    },

    button: {
        marginTop: 25
    },

    buttonText: {
        color: 'rgb(255, 213, 0)',
    },
});

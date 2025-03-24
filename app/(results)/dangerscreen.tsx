import { dangerGradient } from "@/constants/gradientSchema";
import { ResultButton } from "@/components/ResultsComponents/ResultButton";
import { useShowDetails } from "@/hooks/useShowDetails";
import {
    StyleSheet,
    Text
} from "react-native"
import AlertIcon from "@/assets/svg/AlertIcon";
import ResultBackground from "@/components/ResultsComponents/ResultBackground";
import DetailsScreen from "../(details)/detailsscreen";

export default function DangerScreen () {
    const { 
        showDetails, 
        setShowDetails,
        urlScanned,
        finalUrl,
        totalScans,
        maliciousScans,
        enginesList
    } = useShowDetails()    

    return (
        <ResultBackground
            colors={dangerGradient.colors}
            locations={dangerGradient.locations}
            showButton={!showDetails}
        >
            {
                showDetails ? 
                    <DetailsScreen 
                        url={urlScanned}
                        finalUrl={finalUrl}
                        maliciousScans={maliciousScans}
                        totalScans={totalScans}
                        enginesList={enginesList}
                    />
                :   
                    <>
                        <AlertIcon />
                        <Text style={styles.alertText}>¡Alerta Potencial de Seguridad!</Text>
                        <Text style={styles.description}>El c&oacute;digo QR escaneado es un caso de quishing</Text>
                        <ResultButton 
                            handlePress={() => {setShowDetails(true)}}
                            buttonText="Ver detalles"
                            buttonStyle={null}
                            textStyle={styles.buttonText}
                        />
                    </>
            }
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

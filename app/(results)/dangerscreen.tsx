import AlertIcon from "@/assets/svg/AlertIcon";
import AlertText from "@/components/ResultsComponents/AlertText";
import Description from "@/components/ResultsComponents/Description";
import DetailsScreen from "../(details)/detailsscreen";
import ResultBackground from "@/components/ResultsComponents/ResultBackground";
import { dangerGradient } from "@/constants/ScanConstants/gradientSchema";
import { ResultButton } from "@/components/ResultsComponents/ResultButton";
import { useShowDetails } from "@/hooks/useShowDetails";
import { StyleSheet } from "react-native"

export default function DangerScreen () {
    const { 
        showDetails, 
        setShowDetails,
        urlScanned,
        finalUrl,
        totalScans,
        maliciousScans,
        enginesList,
        checkDomainTyposquatting,
        checkSubdomainTyposquatting
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
                        checkDomainTyposquatting={checkDomainTyposquatting}
                        checkSubdomainTyposquatting={checkSubdomainTyposquatting}
                    />
                :   
                    <>
                        <AlertIcon />
                        <AlertText text={"¡Alerta Potencial de Seguridad!"} />
                        <Description text={"El código QR escaneado es un caso de quishing"} />
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
    buttonText: {
        color: 'rgba(255, 138, 128, 1)',
    }
});

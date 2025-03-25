import EngineCounter from "@/components/DetailsComponents/EngineCounter";
import EngineList from "@/components/DetailsComponents/EngineList";
import UrlDetail from "@/components/DetailsComponents/UrlDetail";
import { FilteredAnalysisResult } from "@/interfaces/FilteredAnalysisResult";
import { ResultButton } from "@/components/ResultsComponents/ResultButton";
import { NavigationContext } from "@/contexts/NavigationProvider";
import { 
    PropsWithChildren,
    useContext
} from "react";
import {
    StyleSheet,
    Text,
} from "react-native";

type Props = PropsWithChildren<{
    url: string,
    finalUrl: string,
    maliciousScans: number
    totalScans: number
    enginesList: FilteredAnalysisResult[] | null
}>

export default function DetailsScreen ({ url, finalUrl, maliciousScans, totalScans, enginesList }: Props) {
    const navigationContext = useContext(NavigationContext);
    
    if (!navigationContext) {
        throw new Error("NavigationContext no está disponible.");
    }

    const { router } = navigationContext;
    
    const returnToMenu = () => {
        router.replace("/")
    }

    return (
        <>
            <Text style={styles.title}>Detalles de la Amenaza</Text>
            <UrlDetail 
                    description="URL escaneada"
                    url={url}
                />
                
            {
                url === finalUrl ? 
                    null
                :
                    <UrlDetail 
                        description="URL acortada o redireccionada"
                        url={finalUrl}
                    />
            }

            <EngineCounter 
                maliciousScans={maliciousScans}
                numberOfScans={totalScans}
            />

            <Text style={styles.titleEngine}>Motores de escaneo</Text>
        
            <EngineList enginesList={enginesList}/>
            <ResultButton 
                handlePress={returnToMenu}
                buttonText="Salir"
                buttonStyle={null}
                textStyle={styles.buttonText}
            />
        </>
    );
}

const styles = StyleSheet.create({
    title: {
        color: '#fff',
        fontSize: 30,
        fontWeight: 800,
        marginTop: 25,
    },

    titleEngine: {
        color: '#fff',
        fontSize: 30,
        fontWeight: 800,
        marginTop: 5,
        marginLeft: -40
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

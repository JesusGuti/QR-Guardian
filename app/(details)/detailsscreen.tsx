import EngineCounter from "@/components/DetailsComponents/EngineCounter";
import UrlDetail from "@/components/DetailsComponents/UrlDetail";
import { PropsWithChildren } from "react";
import { ResultButton } from "@/components/ResultsComponents/ResultButton";
import { FilteredAnalysisResult } from "@/interfaces/FilteredAnalysisResult";
import {
    StyleSheet,
    Text
} from "react-native";
import EngineList from "@/components/DetailsComponents/EngineList";

type Props = PropsWithChildren<{
    url: string,
    finalUrl: string,
    maliciousScans: number
    totalScans: number
    enginesList: FilteredAnalysisResult[] | null
}>

export default function DetailsScreen ({ url, finalUrl, maliciousScans, totalScans, enginesList }: Props) {
    return (
        <>
            <Text style={styles.title}>Detalles de la Amenaza</Text>
            <UrlDetail 
                description="URL escaneada"
                url={url}
            />
            <UrlDetail 
                description="URL acortada o redireccionada"
                url={finalUrl}
            />
            <EngineCounter 
                maliciousScans={maliciousScans}
                numberOfScans={totalScans}
            />

            <Text style={styles.titleEngine}>Motores de escaneo</Text>
        
            <EngineList enginesList={enginesList}/>
            <ResultButton 
                handlePress={() => {}}
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
        marginTop: 30,
    },

    titleEngine: {
        color: '#fff',
        fontSize: 30,
        fontWeight: 800,
        marginTop: 20,
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

import { useEffect, useState } from "react";
import { useLocalSearchParams } from "expo-router";
import { VirusTotalAnalysis } from "@/interfaces/VirusTotalAnalysis";
import { FilteredAnalysisResult } from "@/interfaces/FilteredAnalysisResult";
import {
    MALICIOUS_VALUE,
    MALWARE_VALUE,
    PHISHING_VALUE,
    SUSPICIOUS_VALUE
} from "@/constants/resultMessage";

export function useShowDetails () {
    const [showDetails, setShowDetails] = useState(false);
    const [urlScanned, setUrlScanned] = useState("");
    const [finalUrl, setFinalUrl] = useState("");
    const [totalScans, setTotalScans] = useState(0);
    const [maliciousScans, setMaliciousScans] = useState(0);
    const [enginesList, setEnginesList] = useState<FilteredAnalysisResult[] | null>(null);
    const { url, results } = useLocalSearchParams();
    
    useEffect(() => {
        if ((results && typeof results === 'string') && (url && typeof url === 'string')) {
            const parsedResults: VirusTotalAnalysis = JSON.parse(results);
            setUrlScanned(url);
            setFinalUrl(parsedResults.last_final_url);
            setTotalScans(getCountOfAllScans(parsedResults));
            setMaliciousScans(getCountOfMaliciousScans(parsedResults));
            const filteredEngines = filterEngineScanners(parsedResults);
            setEnginesList(filteredEngines);
        }
    }, [url, results])

    return {
        showDetails,
        setShowDetails,
        urlScanned,
        finalUrl,
        totalScans,
        maliciousScans,
        enginesList
    }
}

function filterEngineScanners (analysis: VirusTotalAnalysis): FilteredAnalysisResult[] {
    const { last_analysis_results } = analysis;
    const filteredResults: FilteredAnalysisResult[] = Object.values(last_analysis_results)
        .filter((value) => 
            [MALICIOUS_VALUE, SUSPICIOUS_VALUE, PHISHING_VALUE, MALWARE_VALUE].includes(value.result) ||
            [MALICIOUS_VALUE, SUSPICIOUS_VALUE, PHISHING_VALUE, MALWARE_VALUE].includes(value.category)
    ).sort((a, b) => a.engine_name.localeCompare(b.engine_name));

    console.log(filteredResults)
    return filteredResults;
}

function getCountOfAllScans (analysis: VirusTotalAnalysis): number {
    const { last_analysis_stats } = analysis;
    const { harmless, malicious, suspicious, timeout, undetected } = last_analysis_stats;
    const totalCount = harmless + malicious + suspicious + timeout + undetected;
    return totalCount;
}

function getCountOfMaliciousScans (analysis: VirusTotalAnalysis): number {
    const { last_analysis_stats } = analysis;
    const { malicious, suspicious } = last_analysis_stats;
    const maliciousCount = malicious + suspicious;
    return maliciousCount;
}

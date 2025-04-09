import { FilteredAnalysisResult } from "@/interfaces/FilteredAnalysisResult";
import { useLocalSearchParams } from "expo-router";
import { VirusTotalAnalysis } from "@/interfaces/VirusTotalAnalysis";
import {
    TYPOSQUATTING_DOMAIN_POSITION,
    TYPOSQUATTING_SUBDOMAIN_POSITION,
} from "@/constants/ScanConstants/heuristicsPositions";
import { 
    useEffect, 
    useState 
} from "react";
import {
    MALICIOUS_VALUE,
    MALWARE_VALUE,
    PHISHING_VALUE,
    SUSPICIOUS_VALUE
} from "@/constants/ScanConstants/resultMessage";

export function useShowDetails () {
    const [showDetails, setShowDetails] = useState(false);
    const [urlScanned, setUrlScanned] = useState("");
    const [finalUrl, setFinalUrl] = useState("");
    const [totalScans, setTotalScans] = useState(0);
    const [checkDomainTyposquatting, setCheckDomainTyposquatting] = useState(false);
    const [checkSubdomainTyposquatting, setCheckSubdomainTyposquatting] = useState(false);
    const [maliciousScans, setMaliciousScans] = useState(0);
    const [enginesList, setEnginesList] = useState<FilteredAnalysisResult[] | null>(null);
    const { url, results, heuristics } = useLocalSearchParams();
    
    useEffect(() => {
        if ((url && typeof url === 'string')) setUrlScanned(url);

        if ((results && typeof results === 'string')) {
            const parsedResults: VirusTotalAnalysis = JSON.parse(results);
            setFinalUrl(parsedResults.last_final_url);
            setTotalScans(getCountOfAllScans(parsedResults));
            setMaliciousScans(getCountOfMaliciousScans(parsedResults));
            const filteredEngines = filterEngineScanners(parsedResults);
            setEnginesList(filteredEngines);
        }

        if ((heuristics && typeof heuristics === 'string')) {
            const heuristicsArray: boolean[] = JSON.parse(heuristics);
            const isDomainTyposquattingChecked = heuristicsArray[TYPOSQUATTING_DOMAIN_POSITION];
            const isSubdomainTyposquattingChecked = heuristicsArray[TYPOSQUATTING_SUBDOMAIN_POSITION];
            setCheckDomainTyposquatting(isDomainTyposquattingChecked);
            setCheckSubdomainTyposquatting(isSubdomainTyposquattingChecked);

        }
    }, [url, results, heuristics]);

    return {
        showDetails,
        setShowDetails,
        urlScanned,
        finalUrl,
        totalScans,
        maliciousScans,
        enginesList,
        checkDomainTyposquatting,
        checkSubdomainTyposquatting
    }
}

function filterEngineScanners (analysis: VirusTotalAnalysis): FilteredAnalysisResult[] {
    const { last_analysis_results } = analysis;
    const filteredResults: FilteredAnalysisResult[] = Object.values(last_analysis_results)
        .filter((value) => 
            [MALICIOUS_VALUE, SUSPICIOUS_VALUE, PHISHING_VALUE, MALWARE_VALUE].includes(value.result) ||
            [MALICIOUS_VALUE, SUSPICIOUS_VALUE, PHISHING_VALUE, MALWARE_VALUE].includes(value.category)
    ).sort((a, b) => a.engine_name.localeCompare(b.engine_name));

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

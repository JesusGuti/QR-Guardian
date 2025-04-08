import { Linking } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { VirusTotalAnalysis } from "@/interfaces/VirusTotalAnalysis";
import { 
    useState,
    useEffect
} from "react";
import { 
    checkIfTLDIsRare,
    checkIfDomainIsSuspicious 
} from "@/services/URLServices/checkDomainAndSubdomain";
import {
    checkIfDomainIsTyposquatting,
    checkIfSubdomainPartsAreTyposquatting
} from "@/services/URLServices/checkTyposquattingInURL";

export function useShowSuspiciousDetails() {
    const { url, results, heuristics } = useLocalSearchParams();
    const [isTLDChecked, setIsTLDChecked] = useState(false);
    const [isDomainChecked, setIsDomainChecked] = useState(false);
    const [isScannedChecked, setIsScannedChecked] = useState(false);
    const [isDomainTyposquattingChecked, setIsDomainTyposquattingChecked] = useState(false);
    const [isSubdomainTyposquattingChecked, setIsSubdomainTyposquattingChecked] = useState(false);

    useEffect(() => {
        console.log("heuristics", heuristics);
        if ((url && typeof url === 'string') && (results && typeof results === 'string')) {
            const TLDSuspicious = checkIfTLDIsRare(url);
            const domainSuspicious = checkIfDomainIsSuspicious(url);
            const isDomainACaseOfTyposquatting = checkIfDomainIsTyposquatting(url);
            const isSubdomainACaseOfTyposquatting = checkIfSubdomainPartsAreTyposquatting(url);

            // Set states of checkboxes
            setIsTLDChecked(TLDSuspicious);
            setIsDomainChecked(domainSuspicious);
            setIsDomainTyposquattingChecked(isDomainACaseOfTyposquatting)
            setIsSubdomainTyposquattingChecked(isSubdomainACaseOfTyposquatting);

            const parsedResults: VirusTotalAnalysis = JSON.parse(results);
            const numberOfSuspiciousScans = parsedResults.last_analysis_stats.suspicious;
            if (numberOfSuspiciousScans > 0 || (!TLDSuspicious && !domainSuspicious && !isDomainACaseOfTyposquatting && !isSubdomainACaseOfTyposquatting)) {
                setIsScannedChecked(true) 
            }
        }
    }, [url, results, heuristics]);

    const handlePress = () => {
        Linking.openURL(url.toString()).catch(err => console.error("Ocurrio un error al abrir el enlace", err));
    }
    
    return {
        url,
        handlePress,
        isTLDChecked,
        isDomainChecked,
        isScannedChecked,
        isDomainTyposquattingChecked,
        isSubdomainTyposquattingChecked,
        setIsDomainChecked,
        setIsTLDChecked,
        setIsScannedChecked,
        setIsDomainTyposquattingChecked,
        setIsSubdomainTyposquattingChecked
    }
}
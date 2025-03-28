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
} from "@/services/checkUrl";

export function useShowSuspiciousDetails() {
    const { url, results } = useLocalSearchParams();
    const [isTLDChecked, setIsTLDChecked] = useState(false);
    const [isDomainChecked, setIsDomainChecked] = useState(false);
    const [isScannedChecked, setIsScannedChecked] = useState(false);
 
    useEffect(() => {
        if ((url && typeof url === 'string') && (results && typeof results === 'string')) {
            const TLDSuspicious = checkIfTLDIsRare(url);
            const domainSuspicious = checkIfDomainIsSuspicious(url);
            setIsTLDChecked(TLDSuspicious);
            setIsDomainChecked(domainSuspicious);

            const parsedResults: VirusTotalAnalysis = JSON.parse(results);
            const numberOfSuspiciousScans = parsedResults.last_analysis_stats.suspicious;
            if (numberOfSuspiciousScans > 0 || (!TLDSuspicious && !domainSuspicious)) {
                setIsScannedChecked(true) 
            }
        }
    }, [url, results]);

    const handlePress = () => {
        Linking.openURL(url.toString()).catch(err => console.error("Ocurrio un error al abrir el enlace", err));
    }
    
    return {
        url,
        handlePress,
        isTLDChecked,
        isDomainChecked,
        isScannedChecked,
        setIsDomainChecked,
        setIsTLDChecked,
        setIsScannedChecked
    }
}
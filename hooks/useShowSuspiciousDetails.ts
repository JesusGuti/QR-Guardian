import { Linking } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { 
    useState,
    useEffect
} from "react";
import {
    TLD_POSITION,
    DOMAIN_CHECKED_POSITION, 
    TYPOSQUATTING_DOMAIN_POSITION,
    TYPOSQUATTING_SUBDOMAIN_POSITION,
    SCANNED_POSIITON
} from "@/constants/ScanConstants/heuristicsPositions";

export function useShowSuspiciousDetails() {
    const { url, heuristics } = useLocalSearchParams();
    const [isTLDChecked, setIsTLDChecked] = useState(false);
    const [isDomainChecked, setIsDomainChecked] = useState(false);
    const [isScannedChecked, setIsScannedChecked] = useState(false);
    const [isDomainTyposquattingChecked, setIsDomainTyposquattingChecked] = useState(false);
    const [isSubdomainTyposquattingChecked, setIsSubdomainTyposquattingChecked] = useState(false);

    useEffect(() => {
        if ((url && typeof url === 'string') && (heuristics && typeof heuristics === 'string')) {
            const heuristicsArray: boolean[] = JSON.parse(heuristics);

            // Set states of checkboxes
            setIsTLDChecked(heuristicsArray[TLD_POSITION]);
            setIsDomainChecked(heuristicsArray[DOMAIN_CHECKED_POSITION]);
            setIsDomainTyposquattingChecked(heuristicsArray[TYPOSQUATTING_DOMAIN_POSITION])
            setIsSubdomainTyposquattingChecked(heuristicsArray[TYPOSQUATTING_SUBDOMAIN_POSITION]);
            setIsScannedChecked(heuristicsArray[SCANNED_POSIITON])

        }
    }, [url, heuristics]);

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
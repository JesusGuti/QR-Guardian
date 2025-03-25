import { Linking } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { useState } from "react";

export function useShowSuspiciousDetails() {
    const { url } = useLocalSearchParams();
    const [isTLDChecked, setIsTLDChecked] = useState(false);
    const [isDomainChecked, setIsDomainChecked] = useState(true);
 
    const handlePress = () => {
        Linking.openURL(url.toString()).catch(err => console.error("Ocurrio un error al abrir el enlace", err));
    }
    
    return {
        url,
        handlePress,
        isTLDChecked,
        isDomainChecked,
        setIsDomainChecked,
        setIsTLDChecked
    }
}
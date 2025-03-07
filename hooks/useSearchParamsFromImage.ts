import { 
    useState,
    useEffect
} from "react";
import { useLocalSearchParams } from "expo-router";
import { scanAlertSchema } from "@/constants/scanAlertSchema";
import { 
    checkStartPattern,
    checkIfThereAreHops 
} from "@/services/checkUrl";

export function useSearchParamsFromImage () {
    const { uri, qrdata } = useLocalSearchParams();
    const [obtainedURL, setObtainedURL] = useState("");
    const [scanData, setScanData] = useState(scanAlertSchema.info)
    const [isUrlShorten, setIsUrlShorten] = useState(false);

    useEffect(() => {
        const scannedQR = JSON.parse(qrdata.toString());
        const { data } = scannedQR;

        if (checkStartPattern(data)) {
            setObtainedURL(data);
            setScanData(scanAlertSchema.selected);
            
            setTimeout(async () => {
                const urlAfterCheckHops = await checkIfThereAreHops(data);
                if (urlAfterCheckHops && urlAfterCheckHops !== data) {
                    setObtainedURL(urlAfterCheckHops);
                    setIsUrlShorten(true);
                    setScanData({
                        ...scanAlertSchema.shorten
                    });
                }
            }, 2000);

            return;
        }

        setScanData(scanAlertSchema.error);       
    }, [qrdata]);   

    return {
        uri,
        obtainedURL,
        scanData,
        isUrlShorten
    };
}
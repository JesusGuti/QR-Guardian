import { 
    useState,
    useEffect
} from "react";
import { useLocalSearchParams } from "expo-router";
import { scanAlertSchema } from "@/constants/scanAlertSchema";
import { checkStartPattern } from "@/services/link";

export function useSearchParamsFromImage () {
    const { uri, qrdata } = useLocalSearchParams()
    const [obtainedUrl, setObtainedUrl] = useState("");
    const [scanData, setScanData] = useState(scanAlertSchema.info)

    useEffect(() => {
        const scannedQR = JSON.parse(qrdata)
        const { data } = scannedQR

        if (checkStartPattern(data)) {
            setObtainedUrl(data)
            setScanData(scanAlertSchema.selected)
            return;
        }

        setScanData(scanAlertSchema.error)        
    }, [qrdata])   

    return {
        uri,
        obtainedUrl,
        scanData
    }
}
import { 
    useState,
    useEffect
} from "react";
import { useLocalSearchParams } from "expo-router";
import { scanAlertSchema } from "@/constants/scanAlertSchema";
import { 
    areOriginalUrlAndHoppedSimilar,
    checkIfThereAreHops,
    checkIfIsValidURL
} from "@/services/checkUrl";
import {
    scanUrl,
    getUrlReportAnalysis
} from "@/services/getUrlReport";


export function useSearchParamsFromImage () {
    const { uri, qrdata } = useLocalSearchParams();
    const [obtainedURL, setObtainedURL] = useState("");
    const [scanData, setScanData] = useState(scanAlertSchema.info)
    const [isUrlShorten, setIsUrlShorten] = useState(false);

    useEffect(() => {
        const scannedQR = JSON.parse(qrdata.toString());
        const { data } = scannedQR;

        if (!checkIfIsValidURL(data)) {
            setScanData(scanAlertSchema.error);   
            return;
        }

        setObtainedURL(data);
        setScanData(scanAlertSchema.selected);

        setTimeout(async () => {
            const urlAfterCheckHops = await checkIfThereAreHops(data);
            
            if (!areOriginalUrlAndHoppedSimilar(data, urlAfterCheckHops)) {
                setObtainedURL(urlAfterCheckHops);
                setIsUrlShorten(true);
                setScanData({
                    ...scanAlertSchema.shorten
                });
            }

            // Send to Virus Total API
            const urlID = await scanUrl('metamaaskloginc.webflow.io')
            const results = await getUrlReportAnalysis(urlID) 
            console.log(results)
        }, 1500);    
    }, [qrdata]);   

    return {
        uri,
        obtainedURL,
        scanData,
        isUrlShorten
    };
}

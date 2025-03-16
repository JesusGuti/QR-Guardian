import { 
    useState,
    useEffect,
    useContext
} from "react";
import { useLocalSearchParams } from "expo-router";
import { scanAlertSchema } from "@/constants/scanAlertSchema";
import { 
    areOriginalUrlAndHoppedSimilar,
    checkIfThereAreHops,
    checkIfIsValidURL
} from "@/services/checkUrl";
import {
    isUrlSafe,
    getUrlReportAnalysis,
    scanUrl
} from "@/services/getUrlReport";
import { NavigationContext } from "@/contexts/NavigationProvider";

export function useSearchParamsFromImage () {
    const { uri, qrdata } = useLocalSearchParams();
    const [obtainedURL, setObtainedURL] = useState("");
    const [scanData, setScanData] = useState(scanAlertSchema.info)
    const [isUrlShorten, setIsUrlShorten] = useState(false);
    const { router } = useContext(NavigationContext);
    // const [analysisResult, setAnalysisResult] = useState<VirusTotalAnalysis | null>(null);

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
            
            const urlID = await scanUrl(urlAfterCheckHops);
            const results = await getUrlReportAnalysis(urlID);

            if (isUrlSafe(results)) {
                router.replace({ pathname: "/(results)/safescreen", params: { url: urlAfterCheckHops } });
            } else {
                router.replace({ pathname: "/(results)/dangerscreen", params: { results: JSON.stringify(results)} })
            }
        }, 1500);    
    }, [qrdata]);   

    return {
        uri,
        obtainedURL,
        scanData,
        isUrlShorten
    };
}

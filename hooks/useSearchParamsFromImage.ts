import { 
    useState,
    useEffect
} from "react";
import { useLocalSearchParams } from "expo-router";
import { scanAlertSchema } from "@/constants/scanAlertSchema";
import { useRouter } from "expo-router";
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
import { VirusTotalAnalysis } from "@/interfaces/VirusTotalAnalysis";

export function useSearchParamsFromImage () {
    const { uri, qrdata } = useLocalSearchParams();
    const [obtainedURL, setObtainedURL] = useState("");
    const [scanData, setScanData] = useState(scanAlertSchema.info)
    const [isUrlShorten, setIsUrlShorten] = useState(false);
    // const [analysisResult, setAnalysisResult] = useState<VirusTotalAnalysis | null>(null);
    const router = useRouter()

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
                router.replace({ pathname: "/(results)/safescreen", params: { url: obtainedURL } });
            } else {
                router.replace({ pathname: "/(results)/dangerscreen", params: { results: JSON.stringify(results)} })
            }
            // setAnalysisResult(results);
        }, 1500);    
    }, [qrdata]);   

    // useEffect(() => {
    //     if (analysisResult) {
    //         if (isUrlSafe(analysisResult)) {
    //             router.replace({ pathname: "/(results)/safescreen", params: { url: obtainedURL } });
    //         } else {
    //             router.replace({ pathname: "/(results)/dangerscreen", params: { results: JSON.stringify(analysisResult)} })
    //         }
    //     }
    // }, [analysisResult]);

    return {
        uri,
        obtainedURL,
        scanData,
        isUrlShorten
    };
}

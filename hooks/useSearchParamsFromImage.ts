import { checkAllHeuristics } from "@/services/checkAllHeuristics";
import { NavigationContext } from "@/contexts/NavigationProvider";
import { scanAlertSchema } from "@/constants/ScanConstants/scanAlertSchema";
import { 
    ExternalPathString, 
    UnknownInputParams,
    useLocalSearchParams 
} from "expo-router";
import { 
    useState,
    useEffect,
    useContext
} from "react";
import { 
    areOriginalUrlAndHoppedSimilar,
    checkIfThereAreHops,
    checkIfIsValidURL,
} from "@/services/URLServices/checkUrl";
import {
    isUrlSafe,
    getUrlReportAnalysis,
    scanUrl,
} from "@/services/VirusTotalService/getUrlReport";

export function useSearchParamsFromImage () {
    const { uri, qrdata } = useLocalSearchParams();
    const [obtainedURL, setObtainedURL] = useState("");
    const [scanData, setScanData] = useState(scanAlertSchema.info)
    const [isUrlShorten, setIsUrlShorten] = useState(false);
    const navigationContext = useContext(NavigationContext);

    if (!navigationContext) {
        throw new Error("NavigationContext no está disponible.");
    }

    const { router } = navigationContext;

    const redirectToScreen = (path: string, sentParams: UnknownInputParams) => {
        const createdPath = path as ExternalPathString;
        router.replace({ pathname: createdPath, params: sentParams });
    }

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
            try {
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
                // Checking all heuristics to determine if the URL is suspicious
                const resultCheckHeuristics = checkAllHeuristics(results, data);

                if (!isUrlSafe(results)) {
                    redirectToScreen("/(results)/dangerscreen", { 
                        url: data, 
                        results: JSON.stringify(results), 
                        heuristics: JSON.stringify(resultCheckHeuristics)
                    });
                    return;
                } 
            
                if (resultCheckHeuristics.includes(true)) {
                    redirectToScreen("/(results)/suspiciousscreen", { 
                        url: data, 
                        heuristics: JSON.stringify(resultCheckHeuristics) 
                    });
                    return;
                }
    
                redirectToScreen("/(results)/safescreen", { url: results.last_final_url });
            } catch (error) {
                setScanData({
                    ...scanAlertSchema.failed
                });      
                console.error(error);
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

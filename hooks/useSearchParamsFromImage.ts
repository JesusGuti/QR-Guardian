import { NavigationContext } from "@/contexts/NavigationProvider";
import { scanAlertSchema } from "@/constants/ScanConstants/scanAlertSchema";
import { useLocalSearchParams } from "expo-router";
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
    checkIfDomainIsSuspicious,
    checkIfTLDIsRare
} from "@/services/URLServices/checkDomainAndSubdomain";
import {
    isUrlSafe,
    getUrlReportAnalysis,
    scanUrl,
    isUrlSuspicious
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
    
                if (!isUrlSafe(results)) {
                    router.replace({ pathname: "/(results)/dangerscreen", params: { url: data, results: JSON.stringify(results) } });
                    return;
                } 
    
                if (checkIfTLDIsRare(data) || checkIfDomainIsSuspicious(data) || isUrlSuspicious(results)) {
                    router.replace({ pathname: "/(results)/suspiciousscreen", params: { url: data, results: JSON.stringify(results) } });
                    return;
                }
    
                router.replace({ pathname: "/(results)/safescreen", params: { url: results.last_final_url } });
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

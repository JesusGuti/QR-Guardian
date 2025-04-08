import { VirusTotalAnalysis } from "@/interfaces/VirusTotalAnalysis";
import { isUrlSuspicious } from "./VirusTotalService/getUrlReport";
import { 
    checkIfDomainIsSuspicious,
    checkIfTLDIsRare,
} from "./URLServices/checkDomainAndSubdomain";
import { 
    checkIfDomainIsTyposquatting,
    checkIfSubdomainPartsAreTyposquatting 
} from "./URLServices/checkTyposquattingInURL";

export function checkAllHeuristics (results: VirusTotalAnalysis, url: string): boolean[] {
    const isURLSuspiciousByScanned = isUrlSuspicious(results);
    const isTLDRare = checkIfTLDIsRare(url);
    const isDomainSuspicious = checkIfDomainIsSuspicious(url);
    const isDomainTyposquatting = checkIfDomainIsTyposquatting(url);
    const isSubdomainTyposquatting = checkIfSubdomainPartsAreTyposquatting(url);

    const heuristicsResults = [
        isTLDRare,
        isDomainSuspicious,
        isDomainTyposquatting,
        isSubdomainTyposquatting,
        isURLSuspiciousByScanned
    ];

    return heuristicsResults;
}

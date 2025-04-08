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
    const isURLSuspicious = isUrlSuspicious(results);
    const isTLDRare = checkIfTLDIsRare(url);
    const isDomainSuspicious = checkIfDomainIsSuspicious(url);
    const isDomainTyposquatting = checkIfDomainIsTyposquatting(url);
    const isSubdomainTyposquatting = checkIfSubdomainPartsAreTyposquatting(url);

    const heuristicsResults = [
        isURLSuspicious,
        isTLDRare,
        isDomainSuspicious,
        isDomainTyposquatting,
        isSubdomainTyposquatting
    ];

    return heuristicsResults;
}

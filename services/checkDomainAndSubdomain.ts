import { ClosestWord } from "@/interfaces/ClosestWord";
import { domainNames } from "@/constants/domainNames";
import { suspiciousDomainNames } from "@/constants/suspiciousDomainNames";
import { suspiciousTLD } from "@/constants/suspiciousTLD";
import { shortenURLDomains } from "@/constants/shortenURLDomains";
import {
    distance,
    closest
} from "fastest-levenshtein";

const MIN_DISTANCE = 1;
const LOWER_MAX_DISTANCE = 2;
const MIDDLE_MAX_DISTANCE = 2;
const UPPER_MAX_DISTANCE = 4;
const regex = /[\W_]+/;

export function checkIfDomainIsSuspicious (url: string): boolean {
    try {
        const urlObject = new URL(url);
        const hostname = urlObject.hostname;
        const checkDomain = suspiciousDomainNames.some((domain) => hostname.includes(domain))

        return checkDomain;
    } catch (error) {
        throw new Error(`Ocurrio un error al obtener el dominio ${error}`);
    }
}

export function checkIfDomainIsTyposquatting (url: string): boolean {
    try {
        const urlObject = new URL(url);
        const hostname = urlObject.hostname;
        const parts = hostname.split('.');

        if (parts.length < 2) return false

        const domain = parts[parts.length - 2];
        const closestDomain = closest(domain, domainNames);
        const distanceToClosestDomain = distance(domain, closestDomain);

        // No difference between domain and closest
        if (distanceToClosestDomain === 0) return false;

        // Typosquatting detected
        const MAX_DISTANCE = setMaximumDistance(domain);
        if (distanceToClosestDomain >= MIN_DISTANCE && distanceToClosestDomain <= MAX_DISTANCE) return true;

        // In case a domain is a large word, probably the word typosquatted is embedded. Example: steanmscommnuity, 
        const isReallyClosestInWord = searchClosestInWord(domain, closestDomain, distanceToClosestDomain);

        if (isReallyClosestInWord >= MIN_DISTANCE && isReallyClosestInWord <= MAX_DISTANCE) return true;

       return false;
    } catch (error) {
       throw new Error(`Ocurrio un error al verificar si el dominio es Typosquatting ${error}`);
    }
}

export function checkIfSubdomainPartsAreTyposquatting (url: string): boolean {
    try {
        const urlObject = new URL(url);
        const hostname = urlObject.hostname;
        const parts = hostname.split('.');
 
        if (parts.length <= 2) return false
 
        // Obtaining subdomain parts
        const subdomain = parts.slice(0, parts.length - 1);
        const closestWords: ClosestWord[][] = subdomain.map((part) => {
            const partWords = part.split(regex);

            const partClosestWord = partWords.map((word) => {
                const closestDomain = closest(word, domainNames);
                const distanceValue = distance(word, closestDomain);
                const maxAllowedDistance = setMaximumDistance(word);

                const newClosestWord: ClosestWord = { 
                    part, 
                    closestDomain, 
                    distanceValue, 
                    maxAllowedDistance 
                };

                return newClosestWord;
            })

            return partClosestWord;
        })

        const closestWordsFiltered = closestWords.flat().map((word) => {
            const newDistance = searchClosestInWord(word.part, word.closestDomain, word.distanceValue);
            return { distanceValue: newDistance, maxAllowedDistance: word.maxAllowedDistance };
        }).filter(({ distanceValue, maxAllowedDistance }) => distanceValue >= MIN_DISTANCE && distanceValue <= maxAllowedDistance )    

        if (closestWordsFiltered.length > 0) return true

        return false;
     } catch (error) {
        throw new Error(`Ocurrio un error al verificar si el subdominio es Typosquatting ${error}`);
     }
}

export function checkIfTLDIsRare (url: string): boolean {
    try {
        const urlObject = new URL(url);
        const hostname = urlObject.hostname;
        const parts = hostname.split('.');
        // The last part of the URL is the TLD
        const tld = parts[parts.length - 1];

        return suspiciousTLD.includes(tld);
    } catch (error) {
        throw new Error(`Ocurrio un error al obtener el TLD ${error}`);
    } 
}

export function isDomainAServiceToShortenURL (url:string) {
    const urlObject = new URL(url);
    const hostname = urlObject.hostname;
    const isHostnameShortenURL = shortenURLDomains.some((domain) => hostname.includes(domain));

    return isHostnameShortenURL;
}

/* 
    This function searches in the domain the closest word and if the distance reduces it returns the new distance.
*/
function searchClosestInWord (domain: string, closestString: string, previousDistance: number):number {
    let actualDistance = previousDistance;
    const splittedDomain = domain.split('')
    
    for(let i = 0; i <= domain.length; i++) {
        for (let j = i; j <= domain.length; j++) {
            const composedWord = splittedDomain.slice(i, j).join('')
            
            if (composedWord.length < closestString.length) continue;

            const newDistance = distance(composedWord, closestString)

            if (newDistance !== 0 && newDistance < actualDistance) {
                actualDistance = newDistance
            }
        }
    }

    return actualDistance;
}

function setMaximumDistance (domain: string): number {
    const domainLength = domain.length;
    
    if (domainLength <= 5) return LOWER_MAX_DISTANCE;
    if (domainLength <= 10) return MIDDLE_MAX_DISTANCE;

    return UPPER_MAX_DISTANCE;
}

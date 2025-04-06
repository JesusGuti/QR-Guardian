import { ClosestWord } from "@/interfaces/ClosestWord";
import { domainNames } from "@/constants/URLConstants/domainNames";
import {
    distance,
    closest
} from "fastest-levenshtein";

const MIN_DISTANCE = 1;
const UPPER_MAX_DISTANCE = 10;
const regex = /[\W_]+/;

export function checkIfDomainIsTyposquatting (url: string): boolean {
    try {
        const urlObject = new URL(url);
        const hostname = urlObject.hostname;
        const parts = hostname.split('.');

        if (parts.length < 2) return false

        const domain = parts[parts.length - 2];
        // Dividing the domain into parts if there is a non alphanumeric character
        const domainParts = domain.split(regex);

        const closestWords: ClosestWord[] = domainParts.map((word) => {
            const closestDomain = closest(word, domainNames);
            let distanceValue = distance(closestDomain, word);
            const maxAllowedDistance = setMaximumDistance(word);

            if (distanceValue > maxAllowedDistance) {
                distanceValue = searchClosestInWord(word, closestDomain, distanceValue);
            }

            const newClosestWord: ClosestWord = { 
                domain: word, 
                closestDomain, 
                distanceValue, 
                maxAllowedDistance 
            };

            return newClosestWord;
        })

        const filteredClosestWords = closestWords.flat().filter(({ distanceValue, maxAllowedDistance }) => distanceValue >= MIN_DISTANCE && distanceValue <= maxAllowedDistance )    

        if (filteredClosestWords.length > 0) return true

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
        const subdomain = parts.slice(0, parts.length - 2);
        const closestWords: ClosestWord[][] = subdomain.map((part) => {
            const partWords = part.split(regex);

            const partClosestWord = partWords.map((word) => {
                const closestDomain = closest(word, domainNames);
                let distanceValue = distance(closestDomain, word);
                const maxAllowedDistance = setMaximumDistance(word);

                if (distanceValue > maxAllowedDistance) {
                    distanceValue = searchClosestInWord(word, closestDomain, distanceValue);
                }

                const newClosestWord: ClosestWord = { 
                    domain: word, 
                    closestDomain, 
                    distanceValue, 
                    maxAllowedDistance 
                };

                return newClosestWord;
            })

            return partClosestWord;
        })

        const closestWordsFiltered = closestWords.flat().filter((word) => word.distanceValue >= MIN_DISTANCE && word.distanceValue <= word.maxAllowedDistance )    

        if (closestWordsFiltered.length > 0) return true

        return false;
     } catch (error) {
        throw new Error(`Ocurrio un error al verificar si el subdominio es Typosquatting ${error}`);
     }
}

function doesClosestSharesAtLeastHalfCharactersWithDomain (closest: string, domain: string): boolean {
    let counter = 0;
    for (let i = 0; i < closest.length; i++) {
        if (closest[i] && domain[i] && closest[i] === domain[i]) {
            counter++;;
        }
    }

    if (counter > Math.round(closest.length / 2)) return true;

    return false;
}

/* 
    This function searches in the domain the closest word and if the distance reduces it returns the new distance.
*/
function searchClosestInWord (domain: string, closestString: string, previousDistance: number): number {
    let actualDistance = previousDistance;
    const splittedDomain = domain.split('')
    
    for(let i = 0; i <= domain.length; i++) {
        for (let j = i; j <= domain.length; j++) {
            const composedWord = splittedDomain.slice(i, j).join('');
            
            if (composedWord.length < closestString.length) continue;

            const newDistance = distance(closestString, composedWord);

            if (newDistance === 0 || newDistance >= actualDistance) continue;
                
            if (newDistance < actualDistance &&  doesClosestSharesAtLeastHalfCharactersWithDomain(composedWord, closestString)) {
                actualDistance = newDistance;
            }
        }
    }

    return actualDistance;
}

function setMaximumDistance (domain: string): number {
    const domainLength = domain.length;
    
    if (domainLength < 20) return Math.floor(domainLength / 2);

    return UPPER_MAX_DISTANCE;
}

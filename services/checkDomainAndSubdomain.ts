import { domainNames } from "@/constants/domainNames";
import { suspiciousDomainNames } from "@/constants/suspiciousDomainNames";
import { suspiciousTLD } from "@/constants/suspiciousTLD";
import { shortenURLDomains } from "@/constants/shortenURLDomains";
import {
    distance,
    closest
} from "fastest-levenshtein";

const MIN_DISTANCE = 1;
const MAX_DISTANCE = 3;

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
       console.log("partes", parts)
       const domain = parts[parts.length - 2];

       console.log("dominio", domain)
       const closestDomain = closest(domain, domainNames);
       const distanceToClosestDomain = distance(domain, closestDomain);

       console.log(closestDomain)

       if (distanceToClosestDomain < MIN_DISTANCE || distanceToClosestDomain > MAX_DISTANCE) return false;

       return true;
    } catch (error) {
       throw new Error(`Ocurrio un error al verificar si el dominio es Typosquatting ${error}`);
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

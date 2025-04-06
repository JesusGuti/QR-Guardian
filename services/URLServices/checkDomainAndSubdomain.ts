import { suspiciousDomainNames } from "@/constants/URLConstants/suspiciousDomainNames";
import { suspiciousTLD } from "@/constants/URLConstants/suspiciousTLD";
import { shortenURLDomains } from "@/constants/URLConstants/shortenURLDomains";

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

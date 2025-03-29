import { suspiciousTLD } from "@/constants/suspiciousTLD";
import { suspiciousDomainNames } from "@/constants/suspiciousDomainNames";
import { shortenURLDomains } from "@/constants/shortenURLDomains";

export function checkIfIsValidURL (data: string) : boolean {
    try {
        new URL(data);
        return true;
    } catch (error) {
        console.log(error)
        return false;
    }
}

function domainIsAServiceToShortenURL (url:string) {
    const urlObject = new URL(url);
    const hostname = urlObject.hostname;
    const isHostnameShortenURL = shortenURLDomains.some((domain) => hostname.includes(domain));
    console.log(hostname)
    console.log(isHostnameShortenURL)
    return isHostnameShortenURL;
}

/*  
    Number of hops indicates how many redirections have been realized from the start URL 
*/
export async function checkIfThereAreHops (url: string): Promise<string> {
    if (!domainIsAServiceToShortenURL(url)) return url;

    try {
        let currentUrl = url;

        while (true) {
            const response = await fetch(currentUrl, { method: 'HEAD', redirect: 'manual' });
            // response.url only works on React Native
            const newUrl = response.url;
            // .status and .headers.get('location') works on Node.js
            const responseStatus = response.status;
            const headers = response.headers.get('location');

            if (newUrl && newUrl !== currentUrl) {
                currentUrl = response.url;
            } else if (responseStatus > 300 && responseStatus < 400 && headers) {
                currentUrl = headers;
            } else {
                break;
            }
        }

        return currentUrl;
    } catch (error) {
        throw new Error(`Ocurrio un error en la solicitud ${error}`);
    }
}

/* 
    If the redirected URL share a similar structure probably is only a redirection from the same page
    but if they don't share structure probably is a shorten URL, this doesn't mean that the URL is unsafe
*/
export function areOriginalUrlAndHoppedSimilar (url: string, hoppedUrl: string): boolean {
    if (!url || !hoppedUrl) return false;
    if (url === "" || hoppedUrl === "") return false;

    // Converting string to URL Objects
    const urlObject = new URL(url);
    const hoppedUrlObject = new URL(hoppedUrl);
    
    // If the hostname and protocols change probably the link is shorten
    if (urlObject.host !== hoppedUrlObject.host) return false;
    if (urlObject.protocol !== hoppedUrlObject.protocol) return false;
    
    return true;
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

import { suspiciousTLD } from "@/constants/suspiciousTLD";
import { suspiciousDomainNames } from "@/constants/suspiciousDomainNames";

export function checkIfIsValidURL (data: string) : boolean {
    try {
        new URL(data);
        return true;
    } catch (error) {
        console.log(error)
        return false;
    }
}

/*  
    Number of hops indicates how many redirections have been realized from the start URL 
*/
export async function checkIfThereAreHops (url: string): Promise<string> {
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
        console.error(`Ocurrio un error en la solicitud ${error}`);
        return "Ocurrio un error en la solicitud."
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
        const parts = hostname.split('.');
        const checkDomain = parts.map(part => suspiciousDomainNames.includes(part));

        return checkDomain.includes(true);
    } catch (error) {
        throw new Error(`Ocurrio un error al obtener el dominio ${error}`);
    }
}

import { isDomainAServiceToShortenURL } from "./checkDomainAndSubdomain";

export function checkIfIsValidURL (data: string) : boolean {
    try {
        new URL(data);
        return true;
    } catch (error) {
        // console.log(error)
        return false;
    }
}


/*  
    Number of hops indicates how many redirections have been realized from the start URL 
*/
export async function checkIfThereAreHops (url: string): Promise<string> {
    if (!isDomainAServiceToShortenURL(url)) return url;

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
    If the redirected URL share a similar structure probably is only a redirection from the same page but if they don't share structure probably is a shorten URL, this doesn't mean that the URL is unsafe
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

export function checkStartPattern (data: string ): boolean {
    return data.startsWith("http://") || data.startsWith('https://');
}

/*  
    Number of hops indicates how many redirections have been realized from the start URL 
*/
export async function checkIfThereAreHops (url: string) {
    let currentUrl = url;

    while (true) {
        const response = await fetch(currentUrl, { method: 'HEAD', redirect: 'manual' });
        const newUrl = response.url

        if (newUrl && newUrl !== currentUrl) {
            currentUrl = response.url;
        } else {
            break;
        }
    }

    return currentUrl;
}

/* 
    If the redirected URL share a similar structure probably is only a redirection from the same page
    but if they don't share probably is a shorten URL
*/
export function areOriginalUrlAndHoppedSimilar (url: string, hoppedUrl: string): boolean {
    if (!hoppedUrl) return false;
    
    if (hoppedUrl.startsWith(url)) return true;

    return false;
}

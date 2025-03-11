const unshortenApiUrl = "https://onesimpleapi.com/api/unshorten";
const unshortenApiToken = process.env.EXPO_PUBLIC_UNSHORTENURL_API_TOKEN;

export async function checkIfUrlIsShortened (url: string): Promise<string | null> {
    if (!unshortenApiToken) {
        console.log('No se encontro token para la API.');
        return null;
    }
    
    const params = new URLSearchParams({
        token: unshortenApiToken,
        url: url,
    });

    const fullUrl = `${unshortenApiUrl}?${params.toString()}&output=json`;

    try {
        const response = await fetch(fullUrl);
        
        if (response.ok) {
            const json = await response.json(); 
            // Obtain the expanded URL, trace and number of hops
            const { data, hops, trace } = json;

            if (hops === 0 && areUrlAndTraceStructureSimilar(data, trace)) return url;
            
            return data; 
        } 
        console.error(`Error HTTP: ${response.status}`);
        return null;
    } catch (error) {
        console.error('Error al extender URL', error);
        return null;
    }
}

/* Check if the trace and the URL have similarities in their structure */
function areUrlAndTraceStructureSimilar (url: string, trace: string[]): boolean {
    if (trace && trace.length > 0) {
        const firstTrace = trace[0];
        const doesUrlAndTraceShareStructure = url.startsWith(firstTrace);
        return doesUrlAndTraceShareStructure;
    }

    return true;
}

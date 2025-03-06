const unshortenApiUrl = "https://onesimpleapi.com/api/unshorten";
const unshortenApiToken = process.env.EXPO_PUBLIC_UNSHORTENURL_API_TOKEN;

export function checkStartPattern (data: string ): boolean {
    return data.startsWith("http://") || data.startsWith('https://');
}

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
            console.log()
            // Obtain the expanded URL
            const { data } = json
            return data; 
        } 
        console.error(`Error HTTP: ${response.status}`);
        return null;
    } catch (error) {
        console.error('Error al extender URL', error);
        return null;
    }
}

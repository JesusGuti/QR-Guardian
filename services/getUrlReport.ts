const apiKey = process.env.EXPO_PUBLIC_VIRUSTOTAL_API_KEY;

/*
    This function sends the obtained URL from scan to VirusTotal API. Using the POST method it will check if the URL exists and return and ID
*/
export async function scanUrl (url: string): Promise<string> {
    if (!apiKey) {
        return "Error con las credenciales de acceso";
    }
    
    const options = {
        method: 'POST',
        headers: {
          accept: 'application/json',
          'content-type': 'application/x-www-form-urlencoded',
          'x-apikey': apiKey
        },
        body: new URLSearchParams({ url: url })
    };

    try {
        const response = await fetch("https://www.virustotal.com/api/v3/urls", options);
        const json = await response.json();

        if (!response.ok) {
            const error = json?.error;
             return `Error en la solicitud a VirusTotal: ${response.status} - ${error.message}`;
        }
        
        const { id } = json.data;
        
        if (typeof id !== "string") return "No se encuentra el ID de la URL en VirusTotal";

        const scannedUrlId = id.split("-")?.at(1) ?? "";
        return scannedUrlId;
    } catch (error) {
        return `Error en la solicitud: ${error?.message}`;
    }
}

/*
    This function sends the id obtained by scanning the URL to obtain the result
*/
export async function getUrlReportAnalysis (id: string) {
    const analysisOptions = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            'x-apikey': 'a55854648c4a37c6103ffc8e484698aa58d4661212c23c9f716ebdca0209bd91'
        }
    };
    
    try {
        const response = await fetch(`https://www.virustotal.com/api/v3/urls/${id}`, analysisOptions);
        const json = await response.json();
        
        if (!response.ok) {
            const error = json?.error;
            return `Error en la solicitud a VirusTotal: ${response.status} - ${error.message}`;
        }

        return json;
    } catch (error) {
        return `Error en la solicitud: ${error?.message}`
    }
}

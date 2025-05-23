import { VirusTotalAnalysis } from "@/interfaces/VirusTotalAnalysis";

const apiKey = process.env.EXPO_PUBLIC_VIRUSTOTAL_API_KEY || process.env.TESTING_VIRUSTOTAL_API_KEY;
/*
    This function sends the obtained URL from scan to VirusTotal API. Using the POST method it will check if the URL exists and return and ID
*/
export async function scanUrl (url: string): Promise<string> {    
    if (url === "") {
        throw new Error("Error la URL dada no puede ser vacia.");
    }

    if (!apiKey) {
        throw new Error("Error con las credenciales de acceso.");
    }
    
    const options = {
        method: 'POST',
        headers: {
          accept: 'application/json',
          'content-type': 'application/x-www-form-urlencoded',
          'x-apikey': apiKey
        },
        body: new URLSearchParams({ url: url }).toString()
    };

    try {
        const response = await fetch("https://www.virustotal.com/api/v3/urls", options);
        const json = await response.json();

        if (!response.ok) {
            const error = json?.error;
             throw new Error(`Error en la solicitud a VirusTotal: ${response.status} - ${error.message}`);
        }
        
        const { id } = json.data;
        
        if (typeof id !== "string") return "No se encuentra el ID de la URL en VirusTotal";

        const scannedUrlId = id.split("-")?.at(1) ?? "";
        return scannedUrlId;
    } catch (error: unknown) {
        if (error instanceof Error) {
            throw new Error(`Error en la solicitud: ${error?.message}`);
        } else {
            throw new Error("Ocurrió un error desconocido en la solicitud");
        }
    }
}

/*
    This function sends the id obtained by scanning the URL to obtain the result
*/
export async function getUrlReportAnalysis (id: string): Promise<VirusTotalAnalysis> {
    if (id === "") {
        throw new Error("Error el ID no puede ser vacio.");
    }

    if (!apiKey) {
        throw new Error("Error con las credenciales de acceso.");
    }

    const analysisOptions = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            'x-apikey': apiKey
        }
    };
    
    try {
        const response = await fetch(`https://www.virustotal.com/api/v3/urls/${id}`, analysisOptions);
        const json = await response.json();
        
        if (!response.ok) {
            const error = json?.error;
            throw new Error(`Error en la solicitud a VirusTotal: ${response.status} - ${error.message}`);
        }

        const { attributes } = json.data;
        const result: VirusTotalAnalysis = {
            last_analysis_stats: attributes.last_analysis_stats,
            last_analysis_results: attributes.last_analysis_results,
            last_final_url: attributes.last_final_url,
            url: attributes.url
        }

        return result;
    } catch (error: unknown) {
        if (error instanceof Error) {
            throw new Error(`Error en la solicitud: ${error?.message}`);
        } else {
            throw new Error("Ocurrio un error desconocido en la solicitud");
        }
    }
}

export function isUrlSafe (analysis: VirusTotalAnalysis): boolean {
    const maliciousScansCount = analysis.last_analysis_stats.malicious;

    if (maliciousScansCount > 0) return false;

    return true;
}

export function isUrlSuspicious (analysis: VirusTotalAnalysis): boolean {
    const suspiciousScansCount = analysis.last_analysis_stats.suspicious;

    if (suspiciousScansCount > 0) return true;

    return false;
}

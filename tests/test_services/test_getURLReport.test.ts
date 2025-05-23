import dotenv from 'dotenv';
import { 
    scanUrl,
    getUrlReportAnalysis,
    isUrlSafe,
} from "@/services/VirusTotalService/getUrlReport";

dotenv.config({ path: '.env'});

test("Given an URL that is empty it should throw an error", async () => {
    const URL = "";
    await expect(scanUrl(URL)).rejects.toThrow("Error la URL dada no puede ser vacia.");
});

test("Given a malformed URL it should throw an error", async () => {
    const URL = "htps://sat.gob.mx-subastas.onlne/honda-crv-2017/";
    await expect(scanUrl(URL)).rejects.toThrow(/Error en la solicitud a VirusTotal/)
});

test("Given a well formed URL the method scanUrl it should return an id", async () => {
    const URL = "https://micuenta-actualizacion.com/";
    const ID = "a6806afd7677c317c052810af8455d4e776ed53a6d50e5b36e38db023bd02aa4";

    const result = await scanUrl(URL);
    expect(result).toBe(ID);
});

test("Given a random ID it should throw an error", async () => {
    const ID = "12345677";
    await expect(getUrlReportAnalysis(ID)).rejects.toThrow(/Error en la solicitud a VirusTotal/)
});

test("Given an ID that is empty it should throw an error", async () => {
    const ID = "";
    await expect(getUrlReportAnalysis(ID)).rejects.toThrow("Error el ID no puede ser vacio.");
});

test("Given a correct ID the method getUrlReportAnalysis it should return an object that its type is VirusTotalAnalysis", async () => {
    const ID = "a6806afd7677c317c052810af8455d4e776ed53a6d50e5b36e38db023bd02aa4";
    const result = await getUrlReportAnalysis(ID)
    
    expect(typeof result).toBe("object");
    expect(result).toHaveProperty("last_analysis_stats");
    expect(result.last_analysis_stats).toEqual(
        expect.objectContaining({
            malicious: expect.any(Number),
            suspicious: expect.any(Number),
            undetected: expect.any(Number),
            harmless: expect.any(Number),
            timeout: expect.any(Number),
        })
    );

    expect(result).toHaveProperty("last_analysis_results");
    expect(typeof result.last_analysis_results).toBe("object");

    const firstEngine = Object.values(result.last_analysis_results)[0];
    if (firstEngine) {
        expect(firstEngine).toEqual(
            expect.objectContaining({
                method: expect.any(String),
                engine_name: expect.any(String),
                category: expect.any(String),
                result: expect.any(String),
            })
        );
    }

    expect(result).toHaveProperty("last_final_url", expect.any(String));
    expect(result).toHaveProperty("url", expect.any(String));
});

test("Given a safe URL the function isUrlSafe it should return true", async () => {
    const URL = "https://atlus.com";
    const ID = await scanUrl(URL);
    const result = await getUrlReportAnalysis(ID);

    expect(isUrlSafe(result)).toBe(true);
});

test("Given a suspicious URL the function isUrlSafe it should return true", async () => {
    const URL = "http://account.instagramfacebook.click";
    const ID = await scanUrl(URL);
    const result = await getUrlReportAnalysis(ID);

    expect(isUrlSafe(result)).toBe(false);
});

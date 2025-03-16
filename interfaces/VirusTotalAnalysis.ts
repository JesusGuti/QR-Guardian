export interface VirusTotalAnalysis {
    last_analysis_stats: {
        malicius: number,
        suspicious: number;
        undetected: number;
        harmless: number;
        timeout: number;
    };

    last_analysis_results: Record<
        string,
        {
            method: string;
            engine_name: string;
            category: string;
            result: string;
        }
    >
}

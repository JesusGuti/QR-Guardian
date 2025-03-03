export function checkStartPattern (data: string ): boolean {
    return data.startsWith("http://") || data.startsWith('https://')
}

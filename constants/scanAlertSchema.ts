export const scanAlertSchema = {
    info: {
        scanStatus: 'info',
        icon: '@/assets/images/scan.png',
        message: 'Escaneando código QR...',
    },
    scanned: {
        scanStatus: 'scanned',
        icon: '@/assets/images/qrcode-blue.png',
        message: 'Código QR escaneado'
    },
    error: {
        scanStatus: 'error',
        icon: '@/assets/images/unlink.png',
        message: 'El código QR no contiene una URL'
    }
}

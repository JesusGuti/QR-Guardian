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
    selected: {
        scanStatus: 'scanned',
        icon: '@/assets/images/qrcode-blue.png',
        message: 'Código QR seleccionado'
    },
    shorten: {
        scanStatus: 'scanned',
        icon: '@/assets/images/viewport.png',
        message: 'Código QR escaneado'
    },
    error: {
        scanStatus: 'error',
        icon: '@/assets/images/unlink.png',
        message: 'El código QR no contiene una URL'
    },
    failed: {
        scanStatus: 'error',
        icon: '@/assets/images/unlink.png',
        message: 'Hubo un error en la solicitud.'
    }
}

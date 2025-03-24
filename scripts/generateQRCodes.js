import * as QRCode from "qrcode"
import { randomUUID } from "node:crypto"
import { join, dirname } from "node:path"
import { fileURLToPath } from "node:url"
import { URLArray } from "./URLArray.js"

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const options = {
    type: "png",
    color: {
        dark: '#000',
        light: '#fff'
    },
    scale: 1,
    width: 500,
    margin: 2,
}

async function generateQRCode (URL) {
    const filePath = join(__dirname, "../qr-codes", `${randomUUID()}.png`)

    try {
        QRCode.toFile(filePath, URL, options)
        console.log(`Se generó el código QR ${URL} en: ${filePath}`)
    } catch (error) {
        console.error("Ocurrió un error al generar el código QR", error)
    }
}

URLArray.forEach(URL => generateQRCode(URL))

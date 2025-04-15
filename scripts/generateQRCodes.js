import * as QRCode from "qrcode"
import { randomUUID } from "node:crypto"
import { fileURLToPath } from "node:url"
import { URLArray } from "./URLArray.js"
import { 
    dirname,    
    join, 
} from "node:path"
import { 
    existsSync,
    mkdirSync
} from "node:fs"

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const qrCodeDir = join(__dirname, "../qr-codes");

// Verifica si la carpeta qr-codes no existe y la crea si es necesario
if (!existsSync(qrCodeDir)) {
  try {
    mkdirSync(qrCodeDir, { recursive: true }); // { recursive: true } crea carpetas padre si no existen
    console.log(`Se creó la carpeta: ${qrCodeDir}`);
  } catch (error) {
    throw Error("Ocurrió un error al crear la carpeta qr-codes:", error);
  }
}

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

function generateQRCode (URL) {
    const filePath = join(qrCodeDir, `${randomUUID()}.png`)

    try {
        QRCode.toFile(filePath, URL, options)
        console.log(`Se generó el código QR ${URL} en: ${filePath}`)
    } catch (error) {
        console.error("Ocurrió un error al generar el código QR", error)
    }
}

URLArray.forEach(URL => generateQRCode(URL))

import scanIcon from "@/assets/images/scan.png";
import qrcodeBlueIcon from "@/assets/images/qrcode-blue.png";
import unlinkIcon from "@/assets/images/unlink.png";
import viewportIcon from "@/assets/images/viewport.png";

export function getImageByRoute (iconRoute: string) {
    let imageSource;

    switch (iconRoute) {
        case "@/assets/images/scan.png":
            imageSource = scanIcon;
            break;
        case "@/assets/images/qrcode-blue.png":
            imageSource = qrcodeBlueIcon;
            break;
        case "@/assets/images/unlink.png":
            imageSource = unlinkIcon;
            break;
        case "@/assets/images/viewport.png":
            imageSource = viewportIcon;
            break;
        default: 
            imageSource = scanIcon;
            break;
    }   

    return imageSource
}

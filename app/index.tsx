import { Text, StyleSheet } from 'react-native';
import { ShieldIcon } from '@/assets/svg/ShieldIcon'; 
import { MenuButton } from '@/components/ui/MenuButton';
import { useDocumentPicker } from '@/hooks/useDocumentPicker';
import ErrorHeader from '@/components/ui/ErrorHeader';

import qrCodeIcon from '@/assets/images/qrcode.png';
import imageIcon from '@/assets/images/library-photo.png';

export default function HomeScreen() {
  const { pickImageAndScan, showMessageError } = useDocumentPicker()

  return (
    <>
      { showMessageError && <ErrorHeader message={"La imagen seleccionada no contiene un código QR"} />}
      <ShieldIcon />
      <Text style={styles.title}>QR GUARDIAN</Text>
      <MenuButton 
          icon={qrCodeIcon}
          text='Escanear c&oacute;digo QR'
          route='./camera'
          buttonFunction={null}
      />
      <MenuButton 
        icon={imageIcon}
        text='Seleccionar c&oacute;digo QR'
        route='./'
        buttonFunction={pickImageAndScan}
      />
      <MenuButton 
        icon={imageIcon}
        text='Pantalla insegura'
        route='./dangerscreen'
        buttonFunction={null}
      />
      <MenuButton 
        icon={imageIcon}
        text='Pantalla segura'
        route='./safescreen'
        buttonFunction={null}
      />
    </>
  );
}

const styles = StyleSheet.create({  
  title: {
    color: '#fff',
    fontSize: 35,
    fontWeight: '600',
    marginBottom: 70,
  },
});

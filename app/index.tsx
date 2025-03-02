import { Text, StyleSheet } from 'react-native';
import { ShieldIcon } from '@/assets/svg/ShieldIcon'; 
import { MenuButton } from '@/components/MenuButton';
import qrCodeIcon from '@/assets/images/qrcode.png';
import imageIcon from '@/assets/images/library-photo.png';

export default function HomeScreen() {
  return (
    <>
      <ShieldIcon />
      <Text style={styles.title}>QR GUARDIAN</Text>
      <MenuButton 
          icon={qrCodeIcon}
          text='Escanear c&oacute;digo QR'
          route='./camera'
      />
      <MenuButton 
        icon={imageIcon}
        text='Seleccionar c&oacute;digo QR'
        route='./'
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

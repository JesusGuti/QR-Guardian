import { View, Text, StyleSheet } from 'react-native';
import { ShieldIcon } from '@/assets/svg/ShieldIcon'; 
import { MenuButton } from '@/components/MenuButton';

const qrCodeIcon = require('@/assets/images/qrcode.png');
const imageIcon = require('@/assets/images/library-photo.png')

export default function HomeScreen() {
  return (
    <View style={styles.container}>
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
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000'
  },
  
  title: {
    color: '#fff',
    fontSize: 35,
    fontWeight: '600',
    marginBottom: 70
  },
});

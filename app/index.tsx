import { 
  Text, 
  StyleSheet,
  View 
} from 'react-native';
import { MenuButton } from '@/components/ui/MenuButton';
import { useDocumentPicker } from '@/hooks/useDocumentPicker';
import ErrorHeader from '@/components/ui/ErrorHeader';

import qrCodeIcon from '@/assets/images/qrcode.png';
import imageIcon from '@/assets/images/library-photo.png';
import Shield from '@/components/ui/Shield';

export default function HomeScreen() {
  const { pickImageAndScan, showMessageError } = useDocumentPicker()

  return (
    <View style={styles.container}>
        { showMessageError && <ErrorHeader message={"La imagen seleccionada no contiene un código QR"} />}
        <Text style={styles.title}>QR GUARDIAN</Text>
        <Shield />
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
        <Text style={styles.env}>{process.env.EXPO_PUBLIC_VIRUSTOTAL_API_KEY}</Text>
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
    marginBottom: 20,
  },

  env: {
    color: '#fff',
    fontSize: 10,
    // position: 'absolute',
    bottom: 0
  }
});

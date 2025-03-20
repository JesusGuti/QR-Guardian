import { 
    View,
    Text, 
    StyleSheet,
    Pressable
} from "react-native";
import { PropsWithChildren } from "react";
import BackButton from "@/components/ui/BackButton";
import Shield from "../ui/Shield";


type Props = PropsWithChildren<{
    requestPermission: () => void
}>;

export default function PermissionView ({ requestPermission }: Props) {
    return (
        <View style={styles.container}>
            <BackButton route='../' />
            <Text style={styles.title}>QR GUARDIAN</Text>
            <Shield />
            <Text style={styles.message}>Necesita permisos de c&aacute;mara para analizar un c&oacute;digo QR. Por favor presione el siguiente bot&oacute;n</Text>
            <Pressable style={styles.button} onPress={requestPermission}>
                <Text style={styles.buttonText}>Dar permiso a la c&aacute;mara</Text>
            </Pressable>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
        textAlign: 'center',
        backgroundColor: '#000'
    },

    title: {
        color: '#fff',
        fontSize: 35,
        fontWeight: '600',
        marginBottom: 20,
        marginLeft: 'auto',
        marginRight: 'auto'
      },

    message: {
        marginLeft: 'auto',
        marginRight: 'auto',
        width: 350,
        textAlign: 'center',
        paddingBottom: 10,  
        color: '#fff',
        fontSize: 16
    },
    
    button: {
        margin: 'auto',
        width: 220,
        padding: 20,
        borderRadius: 10,
        marginVertical: 20,
        backgroundColor: '#2196F3',
        gap: 15,
        display: 'flex',
        alignItems: 'center'
    },
    
    buttonText: {
        fontSize: 16,
        fontWeight: 500,
        color: '#fff'
    }
});

import { 
    View,
    Text, 
    StyleSheet,
    Pressable
} from "react-native";
import { PropsWithChildren } from "react";
import { ShieldIcon } from "@/assets/svg/ShieldIcon";
import BackButton from "@/components/BackButton";


type Props = PropsWithChildren<{
    requestPermission: () => void
}>;

export default function PermissionView ({ requestPermission }: Props) {
    return (
        <View style={styles.container}>
            <BackButton route='../' />
            <ShieldIcon />
            <Text style={styles.title}>QR GUARDIAN</Text>
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
        textAlign: 'center'
    },

    title: {
        color: '#fff',
        fontSize: 35,
        fontWeight: '600',
        marginBottom: 70,
        marginLeft: 'auto',
        marginRight: 'auto'
      },

    message: {
        marginLeft: 'auto',
        marginRight: 'auto',
        width: 400,
        textAlign: 'center',
        paddingBottom: 10,  
        color: '#fff'
    },
    
    button: {
        margin: 'auto',
        width: 200,
        padding: 15,
        borderRadius: 10,
        marginVertical: 10,
        backgroundColor: '#2196F3',
        gap: 15,
        display: 'flex',
        alignItems: 'center'
    },
    
    buttonText: {
        fontSize: 15,
        fontWeight: 500,
        color: '#fff'
    }
});

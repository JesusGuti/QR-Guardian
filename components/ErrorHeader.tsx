import { PropsWithChildren } from "react";
import { 
    Text, 
    View,
    StyleSheet 
} from "react-native";

type Props = PropsWithChildren<{
    message: string
}>;

export default function ErrorHeader ({ message }: Props) {
    return (
        <View style={styles.container}>
            <Text style={styles.message}>Error: {message}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#FF5252',
        width: '100%',
        height: 'auto',
        position: 'absolute',
        top: 0,
        borderBottomLeftRadius: 5,
        borderBottomRightRadius: 5,
        padding: 20
    },

    message: {
        color: '#fff',
        fontWeight: 500
    }
})

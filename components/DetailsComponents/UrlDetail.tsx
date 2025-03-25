import { PropsWithChildren } from "react";
import {
    StyleSheet,
    Text,
    View
} from "react-native"

type Props = PropsWithChildren<{
    description: string,
    url: string
}>

export default function UrlDetail ({ description, url }: Props) {
    return (
        <View style={styles.detail}>
            <Text style={styles.description}>{description}</Text>
            <Text style={styles.url}>{url}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    detail: {
        width: 350,
        display: 'flex',
        gap: 5,
        marginTop: 20,
        marginLeft: 30,
        padding: 5,
    },

    description: {
        color: '#fff',
        fontSize: 20,
        fontWeight: 700
    },

    url: {
        color: '#fff',
        fontSize: 18,
        textDecorationLine: 'underline',
        fontWeight: 400
    }
});

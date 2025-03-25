import Checkbox from "expo-checkbox";
import { PropsWithChildren } from "react";
import { 
    StyleSheet,
    Text,
    View 
} from "react-native";

type Props = PropsWithChildren<{
    text: string;
    checked: boolean;
}>

export default function IsSuspiciousCheckbox ({ text, checked }: Props) {
    return (
        <View style={styles.container}>
            <Text style={styles.description}>{text}</Text>
            <Checkbox 
                style={styles.checkbox}
                value={checked}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: 280,
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: 'center',
        padding: 10
    },

    description: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 600
    },

    checkbox: {
        width: 25,
        height: 25,
        borderRadius: 5
    }
});

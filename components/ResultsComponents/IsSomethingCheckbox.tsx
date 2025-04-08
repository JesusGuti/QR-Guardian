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
    checkboxColor: string;
}>

const ELEVATION_VALUE = 7;
const ELEVATION_VALUE_UNCHECKED = 0;

export default function IsSomethingCheckbox ({ text, checked, checkboxColor }: Props) {
    return (
        <View style={styles.container}>
            <Text style={styles.description}>{text}</Text>
            <Checkbox 
                value={checked}
                color={checkboxColor}
                style={[
                    styles.checkbox,
                    checked ? styles.checkBoxSelected : styles.checkBoxUnselected
                ]}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: 320,
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
        borderRadius: 5,
    },

    checkBoxSelected: {
        elevation: ELEVATION_VALUE,
        shadowColor: '#000'   
    },

    checkBoxUnselected: {
        elevation: ELEVATION_VALUE_UNCHECKED,
        shadowColor: '#000'   
    }
});

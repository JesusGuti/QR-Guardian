import {
    Pressable,
    Text,
    StyleProp,
    ViewStyle,
    TextStyle,
    StyleSheet
} from "react-native";
import { PropsWithChildren } from "react";

type Props = PropsWithChildren<{
    handlePress: () => void
    buttonText: string
    buttonStyle: StyleProp<ViewStyle> | null
    textStyle: StyleProp<TextStyle>
}>

export function ResultButton ({ handlePress, buttonText, buttonStyle, textStyle }: Props) {
    return (
        <Pressable 
            onPress={handlePress}    
            style={[buttonStyle, styles.button]}
        >
            <Text style={[textStyle, styles.buttonText]}>{buttonText}</Text>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    button: {
        backgroundColor: '#fff',
        width: 200,
        padding: 16,
        borderRadius: 10, 
        elevation: 5
    },

    buttonText: {
        fontSize: 20,
        fontWeight: 800,
        marginLeft: 'auto',
        marginRight: 'auto'
    }
})

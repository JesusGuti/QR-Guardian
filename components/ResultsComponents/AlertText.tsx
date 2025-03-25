import { PropsWithChildren } from 'react';
import { 
    Text, 
    StyleSheet 
} from 'react-native';

type Props =  PropsWithChildren<{
    text: string
}>

export default function AlertText ({ text }: Props) {
    return (
        <Text style={styles.alertText}>{text}</Text>
    )
}

const styles = StyleSheet.create({
    alertText: {
        color: '#fff',
        fontSize: 24,
        fontWeight: 800,
        marginBottom: 10
    }
});

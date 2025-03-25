import { PropsWithChildren } from 'react';
import { 
    Text, 
    StyleSheet 
} from 'react-native';

type Props =  PropsWithChildren<{
    text: string
}>

export default function Description ({ text }: Props) {
    return (
        <Text style={styles.description}>{text}</Text>
    )
}

const styles = StyleSheet.create({
    description: {
        width: 300,
        fontSize: 18,
        color: '#fff',
        textAlign: 'center',
        marginBottom: 30
    }
});

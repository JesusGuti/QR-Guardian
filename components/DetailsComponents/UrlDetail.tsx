import { PropsWithChildren } from "react";
import {
    StyleSheet,
    Text,
    View
} from "react-native"

type Props = PropsWithChildren<{
    description: string,
    url: string,
    checkDomainTyposquatting: boolean,
    checkSubdomainTyposquatting: boolean
}>

export default function UrlDetail ({ description, url, checkDomainTyposquatting, checkSubdomainTyposquatting }: Props) {
    const highlightSuspiciousPart = () => {
        try {
            const urlObject = new URL(url);
            const { hostname, protocol, pathname } = urlObject;
            const splittedDomain = hostname.split(".");
            const TLD = splittedDomain.pop();
            const domain = splittedDomain.pop();

            return (
                <Text style={styles.url} numberOfLines={3}>
                    {protocol}//
                    <Text style={(checkSubdomainTyposquatting) ? styles.suspiciousPart : styles.url}>{splittedDomain.length > 0 ?  `${splittedDomain.join(".")}.` : ""}</Text>
                    <Text style={(checkDomainTyposquatting) ? styles.suspiciousPart : styles.url}>{domain}.</Text>
                    {TLD}
                    {pathname}
                </Text>
            );
        } catch (error) {
            throw new Error(`Error al resaltar la parte sospechosa de la URL ${error}`);
        }
    };
    

    return (
        <View style={styles.detail}>
            <Text style={styles.description}>{description}</Text>
            {highlightSuspiciousPart()}
        </View>
    );
}

const styles = StyleSheet.create({
    detail: {
        width: 350,
        display: 'flex',
        gap: 5,
        marginTop: 10,
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
    },

    suspiciousPart: {
        color: '#D45454',
        fontSize: 18,
        fontWeight: '700'
    }
});

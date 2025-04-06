import { PropsWithChildren } from "react";
import { FilteredAnalysisResult } from "@/interfaces/FilteredAnalysisResult";
import {
    Text,
    FlatList,
    View,
    StyleSheet,
    Image
} from "react-native";
import {
    MALICIOUS_VALUE,
    MALWARE_VALUE,
    PHISHING_VALUE,
    SUSPICIOUS_VALUE,
    messages
} from "@/constants/ScanConstants/resultMessage"

import phishingIcon from "@/assets/images/fish-hook.png";
import maliciousIcon from "@/assets/images/exclamation-circle.png";
import suspiciousIcon from"@/assets/images/zoom-exclamation.png";

type Props = PropsWithChildren<{
    enginesList: FilteredAnalysisResult[] | null
}>

export default function EngineList ({ enginesList }: Props) {
    const showImage = (message: string) => {
        let image
        switch (message) {
            case MALICIOUS_VALUE:
                image = maliciousIcon;
                break;            
            case MALWARE_VALUE:
                image = maliciousIcon;
                break;     
            case PHISHING_VALUE:
                image = phishingIcon;
                break;  
            case SUSPICIOUS_VALUE:
                image = suspiciousIcon;
                break;  
            default: 
                image = suspiciousIcon;
                break;
        }

        return image
    }

    const showRealMessage = (originalMessage: string) => {
        const checkIndex = messages.find((item) => item.originalMessage === originalMessage);
        if (checkIndex) return checkIndex?.finalMessage;
        
        const firstLetter = originalMessage.at(0)?.toUpperCase();
        const restOfWord = originalMessage.slice(1, originalMessage.length);
        return firstLetter + restOfWord;
    }

    return (
        <FlatList
            data={enginesList}
            keyExtractor={(item) => item.engine_name}
            renderItem={({ item, index }) => {
                const isFirst = index === 0;
                const isLast = enginesList && index === enginesList?.length - 1;

                return (
                    <View style={[
                        styles.item,
                        isFirst && styles.firstItem,
                        isLast && styles.lastItem
                    ]}>
                        <Text style={styles.itemText}>{item.engine_name}</Text>
                        <View style={styles.engineResult}>
                            <Image 
                                source={showImage(item.result)} 
                                style={{ width: 32, height: 32, resizeMode: 'center' }} 
                            />
                            <Text style={styles.itemText}>{showRealMessage(item.result)}</Text>
                        </View>
                    </View>  
                )
            }}
            style={styles.list}
        >

        </FlatList>
    );
}

const styles = StyleSheet.create({
    list: {
        backgroundColor: '#fff',
        marginVertical: 20,
        maxHeight: 250,
        width: 330,
        borderRadius: 10,
        paddingHorizontal: 20,

    },

    item: {
        paddingVertical: 15,
        borderBottomWidth: 2,
        borderBottomColor: '#f0f0f0',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },

    firstItem: {
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10
    },

    lastItem: {
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10
    },

    itemText: {
        fontSize: 14,
        fontWeight: 700,
    },

    engineResult: {
        display: 'flex',
        width: 115,
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10
    }
})

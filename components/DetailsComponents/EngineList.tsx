import { PropsWithChildren } from "react";
import { FilteredAnalysisResult } from "@/interfaces/FilteredAnalysisResult";
import {
    Text,
    FlatList,
    View,
    StyleSheet
} from "react-native";

type Props = PropsWithChildren<{
    enginesList: FilteredAnalysisResult[] | null
}>

export default function EngineList ({ enginesList }: Props) {
    return (
        <FlatList
            data={enginesList}
            keyExtractor={(item) => item.engine_name}
            renderItem={({ item, index }) => {
                const isEven = index % 2 === 0;
                const isFirst = index === 0;
                const isLast = enginesList && index === enginesList?.length - 1;

                return (
                    <View style={[
                        styles.item,
                        isEven ? styles.redItemList : styles.whiteItemList,
                        isFirst && styles.firstItem,
                        isLast && styles.lastItem
                    ]}>
                        <Text style={styles.itemText}>{item.engine_name}</Text>
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
        marginVertical: 20,
        maxHeight: 250,
        width: 320,
        zIndex: 2
    },

    item: {
        padding: 20
    },

    redItemList: {
        backgroundColor: 'rgba(245, 232, 231, 0.46)',
    },

    whiteItemList: {
        backgroundColor: '#fff',
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
        fontSize: 18,
        fontWeight: 700
    }
})

import { StyleSheet } from "react-native";
import { PropsWithChildren } from "react";
import { LinearGradient } from "expo-linear-gradient";
import BackButton from "../ui/BackButton";

type Props = PropsWithChildren<{
    colors: readonly [string, string] 
    locations: readonly [number, number] 
    showButton: boolean
}>

export default function ResultBackground ({ colors, locations, showButton, children }: Props) {
    return (
        <LinearGradient
            colors={colors}
            locations={locations}
            style={styles.gradient

            }
        >
            {showButton && <BackButton route="../" />}
            {children}
        </LinearGradient>
    );
}

const styles = StyleSheet.create({
    gradient: {
        width: '100%',
        height: '100%',
        display: 'flex',
        alignItems: 'center'
    }
})

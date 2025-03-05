import { Link, RelativePathString } from "expo-router";
import { Pressable } from "react-native";
import { PropsWithChildren } from "react";
import { StyleSheet } from "react-native";
import BackArrowIcon from "@/assets/svg/BackArrowIcon";

type Props = PropsWithChildren<{
    route: RelativePathString
}>;

export default function BackButton ({ route }: Props) {
    return (
        <Link href={route} asChild>
            <Pressable style={styles.backButton}>
                <BackArrowIcon />
            </Pressable>    
        </Link>
    )
}

const styles = StyleSheet.create({
    backButton: {
        position: 'absolute',
        zIndex: 2,
        top: 10,
        left: 10
    },
})

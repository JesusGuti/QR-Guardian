import { Slot } from "expo-router"
import { View, StyleSheet, StatusBar } from "react-native";

export default function Layout () {
    return (
        <View style={style.container}>
            <Slot />
            <StatusBar barStyle={"dark-content"} />
        </View>
    )
}

const style = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#000'
    }
})

import { SafeAreaView } from "react-native-safe-area-context";
import { Slot } from "expo-router"
import { StatusBar } from "react-native";
import { NavigationProvider } from "@/contexts/NavigationProvider";

export default function Layout () {
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <NavigationProvider>
                <Slot />
                <StatusBar barStyle={"dark-content"} translucent={false} />
            </NavigationProvider>
        </SafeAreaView>
    )
}

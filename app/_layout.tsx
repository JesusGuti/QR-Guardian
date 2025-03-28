import { SafeAreaView } from "react-native-safe-area-context";
import { Slot } from "expo-router"
import { useColorScheme, StatusBar } from "react-native";
import { NavigationProvider } from "@/contexts/NavigationProvider";

export default function Layout () {
    const theme = useColorScheme();

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <NavigationProvider>
                <Slot />
                <StatusBar barStyle={theme === 'dark' ? "light-content" : "dark-content"} translucent={true}/>
            </NavigationProvider>
        </SafeAreaView>
    )
}

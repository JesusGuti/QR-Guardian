import { Slot } from "expo-router"
import { StatusBar } from "react-native";
import { NavigationProvider } from "@/contexts/NavigationProvider";

export default function Layout () {
    return (
        <>
            <NavigationProvider>
                <Slot />
                <StatusBar barStyle={"dark-content"} />
            </NavigationProvider>
        </>
    )
}

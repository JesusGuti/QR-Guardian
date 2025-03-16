import { createContext } from "react";
import { 
    useRouter, 
    Router 
} from "expo-router";

export const NavigationContext = createContext<Router | null>(null);

export function NavigationProvider ({ children }) {
    const router = useRouter();

    return (
        <NavigationContext.Provider value={{ router }}>
            {children}
        </NavigationContext.Provider>
    );
}

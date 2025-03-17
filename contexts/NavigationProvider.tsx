import { 
    createContext,
    PropsWithChildren
} from "react";
import { 
    useRouter, 
    Router 
} from "expo-router";

export const NavigationContext = createContext<{ router: Router} | null>(null);

type Props = PropsWithChildren<object>;
export function NavigationProvider ({ children }: Props) {
    const router = useRouter();

    return (
        <NavigationContext.Provider value={{ router }}>
            {children}
        </NavigationContext.Provider>
    );
}

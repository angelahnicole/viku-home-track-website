import { useMediaQuery } from "@mui/material";

import React from "react";

// ================================================================

export type VikuColorMode = "light" | "dark";

const VikuColorModeContext = React.createContext<
    | {
          colorMode: VikuColorMode;
          isDarkMode: boolean;
          toggleColorMode: () => void;
      }
    | undefined
>(undefined);

export function useVikuColorMode() {
    const context = React.useContext(VikuColorModeContext);
    if (!context) {
        throw new Error("useVikuColorMode must be used within VikuColorModeContext.Provider");
    }
    return context;
}

interface VikuColorModeProviderProps {
    children: React.ReactNode;
}

export function VikuColorModeProvider({
    children,
}: VikuColorModeProviderProps): React.ReactElement {
    // Initialize state from system preference
    const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");
    const [colorMode, setColorMode] = React.useState<VikuColorMode>(
        prefersDarkMode ? "dark" : "light",
    );
    const isDarkMode = colorMode === "dark";

    // On mount, check local storage for user preference
    React.useEffect(() => {
        const colorModePreference = window.localStorage.getItem("vikuColorMode");
        if (colorModePreference === "dark" || colorModePreference === "light") {
            setColorMode(colorModePreference as VikuColorMode);
        }
    }, []);

    const toggleColorMode = () => {
        setColorMode((prev) => {
            const newMode: VikuColorMode = prev === "dark" ? "light" : "dark";
            window.localStorage.setItem("vikuColorMode", newMode);
            return newMode;
        });
    };

    return (
        <VikuColorModeContext.Provider value={{ colorMode, isDarkMode, toggleColorMode }}>
            {children}
        </VikuColorModeContext.Provider>
    );
}

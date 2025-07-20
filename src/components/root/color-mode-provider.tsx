import { useMediaQuery } from "@mui/material";

import React from "react";

// ================================================================

export type ColorMode = "light" | "dark";

const ColorModeContext = React.createContext<
    | {
          colorMode: ColorMode;
          toggleColorMode: () => void;
      }
    | undefined
>(undefined);

export function useColorMode() {
    const context = React.useContext(ColorModeContext);
    if (!context) {
        throw new Error("useColorMode must be used within ColorModeContext.Provider");
    }
    return context;
}

interface ColorModeProviderProps {
    children: React.ReactNode;
}

export function ColorModeProvider({ children }: ColorModeProviderProps): React.ReactElement {
    // Initialize state from system preference
    const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");
    const [colorMode, setColorMode] = React.useState<ColorMode>(prefersDarkMode ? "dark" : "light");

    // On mount, check local storage for user preference
    React.useEffect(() => {
        const colorModePreference = window.localStorage.getItem("vikuColorMode");
        if (colorModePreference === "dark" || colorModePreference === "light") {
            setColorMode(colorModePreference as ColorMode);
        }
    }, []);

    const toggleColorMode = () => {
        setColorMode((prev) => {
            const newMode: ColorMode = prev === "dark" ? "light" : "dark";
            window.localStorage.setItem("vikuColorMode", newMode);

            console.log(">>>>>>>> Toggling color mode from", prev, "to", newMode);

            return newMode;
        });
    };

    return (
        <ColorModeContext.Provider value={{ colorMode, toggleColorMode }}>
            {children}
        </ColorModeContext.Provider>
    );
}

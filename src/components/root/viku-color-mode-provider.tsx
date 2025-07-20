import { useMediaQuery } from "@mui/material";

import React, { JSX } from "react";

// ================================================================

/**
 * Represents the color mode for the application.
 * Can be either 'light' or 'dark'.
 */
export type VikuColorMode = "light" | "dark";

/**
 * Context type for managing color mode state and actions.
 */
type VikuColorModeContextType = {
    /**
     * The current color mode of the application.
     */
    colorMode: VikuColorMode;
    /**
     * Indicates if the current color mode is dark.
     */
    isDarkMode: boolean;
    /**
     * Function to toggle the color mode between light and dark.
     */
    toggleColorMode: () => void;
};

/**
 * Context for managing color mode state across the application.
 */
const VikuColorModeContext = React.createContext<VikuColorModeContextType | undefined>(undefined);

// ------------------------------------------------------------------------------------------------

/**
 * Custom hook to access the VikuColorMode context by the rest of the application.
 *
 * Throws an error if used outside the provider.
 *
 * @returns The color mode context value.
 */
export function useVikuColorMode(): VikuColorModeContextType {
    const context = React.useContext(VikuColorModeContext);
    if (!context) {
        throw new Error("useVikuColorMode must be used within VikuColorModeContext.Provider");
    }
    return context;
}

// ------------------------------------------------------------------------------------------------

interface VikuColorModeProviderProps {
    /**
     * The child nodes to render within the color mode provider.
     */
    children: React.ReactNode;
}

/**
 * Provides color mode context to the application and manages user/system preference.
 *
 * @param props See VikuColorModeProviderProps
 */
export function VikuColorModeProvider({ children }: VikuColorModeProviderProps): JSX.Element {
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

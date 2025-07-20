"use client";

import { useState, useMemo } from "react";
import { createTheme } from "@mui/material";
import { Theme } from "@mui/material/styles";

// ================================================================================================

// Solarized color palette
const solarized = {
    base03: "#002b36",
    base02: "#073642",
    base01: "#586e75",
    base00: "#657b83",
    base0: "#839496",
    base1: "#93a1a1",
    base2: "#eee8d5",
    base3: "#fdf6e3",
    yellow: "#b58900",
    orange: "#cb4b16",
    red: "#dc322f",
    magenta: "#d33682",
    violet: "#6c71c4",
    blue: "#268bd2",
    cyan: "#2aa198",
    green: "#859900",
};

// Solarized Light Theme
function getLightPalette() {
    return {
        primary: {
            main: solarized.blue,
        },
        secondary: {
            main: solarized.cyan,
        },
        error: {
            main: solarized.red,
        },
        warning: {
            main: solarized.orange,
        },
        info: {
            main: solarized.cyan,
        },
        success: {
            main: solarized.green,
        },
        text: {
            primary: solarized.base00,
            secondary: solarized.base01,
        },
        background: {
            default: solarized.base3,
            paper: solarized.base2,
        },
    };
}

// Solarized Dark Theme
function getDarkPalette() {
    return {
        primary: {
            main: solarized.blue,
        },
        secondary: {
            main: solarized.cyan,
        },
        error: {
            main: solarized.red,
        },
        warning: {
            main: solarized.orange,
        },
        info: {
            main: solarized.cyan,
        },
        success: {
            main: solarized.green,
        },
        text: {
            primary: solarized.base0,
            secondary: solarized.base1,
        },
        background: {
            // Reverted to original Solarized dark background
            default: solarized.base03,
            paper: solarized.base02,
        },
    };
}

// ------------------------------------------------------------------------------------------------

export type ThemeMode = "light" | "dark";

export default function useTheme(): {
    theme: Theme;
    mode: ThemeMode;
    setMode: React.Dispatch<React.SetStateAction<ThemeMode>>;
} {
    const [mode, setMode] = useState<ThemeMode>("light");
    const isDarkMode = mode === "dark";

    const palette = useMemo(() => {
        return isDarkMode ? getDarkPalette() : getLightPalette();
    }, [isDarkMode]);

    const theme = useMemo(
        () =>
            createTheme({
                palette: {
                    mode,
                    ...palette,
                },
                typography: {
                    fontFamily: "var(--font-roboto)",
                    h5: {
                        color: isDarkMode ? solarized.base1 : solarized.base01,
                    },
                },
                components: {
                    // MuiPaper: {
                    //     styleOverrides: {
                    //         root: {
                    //             backgroundImage: "none", // Disables MUI's default gradient
                    //         },
                    //     },
                    // },
                    MuiAppBar: {
                        styleOverrides: {
                            root: {
                                backgroundColor: isDarkMode ? solarized.base02 : solarized.base2,
                                color: isDarkMode ? solarized.base1 : solarized.base01,
                            },
                        },
                    },
                },
            }),
        [mode, isDarkMode, palette],
    );

    return { theme, mode, setMode };
}

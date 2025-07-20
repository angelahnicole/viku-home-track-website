"use client";

import useTheme from "@/lib/theme";
import { VikuThemeModeContext } from "@/lib/viku-theme-mode-context";

import { AppRouterCacheProvider } from "@mui/material-nextjs/v15-appRouter";
import { JSX } from "react";
import { ThemeProvider } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";

// ================================================================================================

interface VikuThemeProps {
    children?: React.ReactNode;
}

export default function VikuTheme({ children }: VikuThemeProps): JSX.Element {
    const { theme, mode, setMode } = useTheme();

    return (
        <AppRouterCacheProvider options={{ enableCssLayer: true }}>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                <VikuThemeModeContext.Provider value={{ mode, setMode }}>
                    {children}
                </VikuThemeModeContext.Provider>
            </ThemeProvider>
        </AppRouterCacheProvider>
    );
}

"use client";

import { VikuColorModeProvider } from "@/components/root/viku-color-mode-provider";
import VikuThemeProvider from "@/components/root/viku-theme-provider";

import { AppRouterCacheProvider } from "@mui/material-nextjs/v15-appRouter";
import { JSX } from "react";

// ================================================================================================

interface VikuProvidersProps {
    children?: React.ReactNode;
}

export default function VikuProviders({ children }: VikuProvidersProps): JSX.Element {
    return (
        <VikuColorModeProvider>
            <AppRouterCacheProvider options={{ enableCssLayer: true }}>
                <VikuThemeProvider>{children}</VikuThemeProvider>
            </AppRouterCacheProvider>
        </VikuColorModeProvider>
    );
}

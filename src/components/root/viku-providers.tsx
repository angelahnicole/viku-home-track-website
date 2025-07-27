"use client";

import { VikuColorModeProvider } from "@/components/root/viku-color-mode-provider";
import VikuThemeProvider from "@/components/root/viku-theme-provider";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v15-appRouter";
import React, { JSX } from "react";

// ================================================================================================

interface VikuProvidersProps {
    /**
     * The child nodes to render within the provider tree.
     */
    children?: React.ReactNode;
}

/**
 * Provides color mode and theme context to the application.
 * Wraps children with color mode and theme providers.
 *
 * @param props See VikuProvidersProps
 */
export default function VikuProviders({ children }: VikuProvidersProps): JSX.Element {
    // Create a client to help with fetching and caching data in the app.
    const [queryClient] = React.useState(
        () =>
            new QueryClient({
                defaultOptions: {
                    queries: {
                        // With SSR, we usually want to set some default staleTime
                        // above 0 to avoid refetching immediately on the client
                        staleTime: 60 * 1000,
                    },
                },
            }),
    );

    return (
        // Adding a provider for React Query to help with fetching and caching data in the app.
        <QueryClientProvider client={queryClient}>
            {/* Shown only in dev: Devtools for debugging queries */}
            <ReactQueryDevtools initialIsOpen={false} position="top" />
            {/* Provider for the app's color mode (i.e. dark/light) */}
            <VikuColorModeProvider>
                {/* Adding a cache provider for material UI, enabling the CSS layer so tailwind works properly */}
                <AppRouterCacheProvider options={{ enableCssLayer: true }}>
                    {/* Renders the MUI ThemeProvider with the current theme */}
                    <VikuThemeProvider>{children}</VikuThemeProvider>
                </AppRouterCacheProvider>
            </VikuColorModeProvider>
        </QueryClientProvider>
    );
}

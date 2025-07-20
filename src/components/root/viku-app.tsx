"use client";

import { useVikuColorMode } from "@/components/root/viku-color-mode-provider";

import { Switch, AppBar, Toolbar, Typography, Box } from "@mui/material";
import {
    Brightness4 as Brightness4Icon,
    Brightness7 as Brightness7Icon,
} from "@mui/icons-material";

import React, { JSX } from "react";

// ================================================================================================

interface VikuAppProps {
    children: React.ReactNode;
}

export default function VikuApp({ children }: VikuAppProps): JSX.Element {
    const { isDarkMode, toggleColorMode } = useVikuColorMode();

    // Ensure the component is mounted before rendering to avoid hydration issues and flash of
    // unstyled content (FOUC).
    // See: https://nextjs.org/docs/app/building-your-application/rendering/hydration
    const [mounted, setMounted] = React.useState(false);
    React.useEffect(() => {
        setMounted(true);
    }, []);
    if (!mounted) {
        return <></>;
    }

    return (
        <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        VikuHomeTrack
                    </Typography>
                    <Switch checked={isDarkMode} onChange={toggleColorMode} />
                    {isDarkMode ? <Brightness4Icon /> : <Brightness7Icon />}
                </Toolbar>
            </AppBar>

            <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
                {children}
            </Box>
        </Box>
    );
}

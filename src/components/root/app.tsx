"use client";

import { useColorMode } from "@/components/root/color-mode-provider";

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

export default function App({ children }: VikuAppProps): JSX.Element {
    const { colorMode, toggleColorMode } = useColorMode();
    const isDarkMode = colorMode === "dark";

    return (
        <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        Viku Home Track
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

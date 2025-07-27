"use client";

import { useState } from "react";
import { Alert, Button, Box, CircularProgress, Paper, Typography } from "@mui/material";
import clsx from "clsx";

/**
 * The test page for displaying Vikunja info. Fetches and displays info from the Vikunja API.
 */
export default function VikunjaInfoPage() {
    const [info, setInfo] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<null | string>(null);

    // Fetches Vikunja info from the API and updates state.
    const fetchInfo = async () => {
        setLoading(true);
        setError(null);
        try {
            const res = await fetch("/api/vikunja-task");
            if (!res.ok) throw new Error("Failed to fetch");
            const data = await res.json();
            setInfo(data);
        } catch (err) {
            setError(`Error fetching info: ${err}`);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Box
            className={clsx(
                "flex",
                "min-h-screen",
                "flex-col",
                "items-center",
                "justify-center",
                "p-8",
            )}
        >
            <Paper className={clsx("w-full", "max-w-xl", "rounded-lg", "p-8", "shadow-md")}>
                <Typography variant="h3">Vikunja Info</Typography>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={fetchInfo}
                    disabled={loading}
                    className={clsx("mb-4")}
                    fullWidth
                >
                    {loading ? <CircularProgress size={24} color="inherit" /> : "Get Vikunja Info"}
                </Button>
                {error && (
                    <Alert severity="error" className={clsx("mb-4")}>
                        {error}
                    </Alert>
                )}
                {info && (
                    <pre
                        className={clsx(
                            "mt-4",
                            "overflow-x-auto",
                            "rounded",
                            "border",
                            "border-gray-800",
                            "bg-gray-900",
                            "p-4",
                            "text-sm",
                            "text-gray-100",
                            "shadow-inner",
                        )}
                    >
                        {JSON.stringify(info, null, 2)}
                    </pre>
                )}
            </Paper>
        </Box>
    );
}

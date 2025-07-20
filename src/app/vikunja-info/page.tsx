"use client";

import { useState } from "react";
import Button from "@mui/material/Button";
import Alert from "@mui/material/Alert";
import CircularProgress from "@mui/material/CircularProgress";
import clsx from "clsx";

export default function VikunjaInfoPage() {
    const [info, setInfo] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<null | string>(null);

    const fetchInfo = async () => {
        setLoading(true);
        setError(null);
        try {
            const res = await fetch("/api/vikunja-info");
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
        <main
            className={clsx(
                "flex",
                "min-h-screen",
                "flex-col",
                "items-center",
                "justify-center",
                "bg-gray-50",
                "p-8",
            )}
        >
            <div
                className={clsx("w-full", "max-w-xl", "rounded-lg", "bg-white", "p-8", "shadow-md")}
            >
                <h1 className={clsx("mb-6", "text-3xl", "font-bold", "text-blue-700")}>
                    Vikunja Info
                </h1>
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
            </div>
        </main>
    );
}

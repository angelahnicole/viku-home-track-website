"use client";

import React, { useState } from "react";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import Image from "next/image";

const CAT_API = "https://api.thecatapi.com/v1/images/search?mime_types=gif";

export default function Home() {
    const [catGif, setCatGif] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    const fetchCatGif = async () => {
        setLoading(true);
        try {
            const res = await fetch(CAT_API);
            const data = await res.json();
            setCatGif(data[0]?.url || null);
        } catch {
            setCatGif(null);
        } finally {
            setLoading(false);
        }
    };

    React.useEffect(() => {
        fetchCatGif();
    }, []);

    return (
        <div
            style={{
                minHeight: "80vh",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
            }}
        >
            <Paper
                elevation={6}
                sx={{
                    p: 4,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: 2,
                    maxWidth: 400,
                }}
            >
                <h2 style={{ marginBottom: 16 }}>Random Funny Cat Gif</h2>
                {loading ? (
                    <CircularProgress />
                ) : catGif ? (
                    <Image
                        src={catGif}
                        alt="A funny cat gif"
                        width={400}
                        height={400}
                        style={{ maxWidth: "100%", borderRadius: 8, height: "auto" }}
                        unoptimized
                    />
                ) : (
                    <div>No cat gif found. Try again!</div>
                )}
                <Button variant="contained" color="primary" onClick={fetchCatGif} sx={{ mt: 2 }}>
                    Refresh
                </Button>
            </Paper>
        </div>
    );
}

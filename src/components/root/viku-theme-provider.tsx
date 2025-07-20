import useTheme from "@/lib/theme";
import { JSX } from "react";
import { ThemeProvider } from "@mui/material/styles";

// ================================================================================================

interface ThemeProviderProps {
    children: React.ReactNode;
}

export default function VikuThemeProvider({ children }: ThemeProviderProps): JSX.Element {
    const theme = useTheme();
    return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
}

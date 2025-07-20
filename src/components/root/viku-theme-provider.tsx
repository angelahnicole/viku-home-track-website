import useTheme from "@/lib/theme";

import { JSX } from "react";
import { ThemeProvider } from "@mui/material/styles";

// ================================================================================================

interface VikuThemeProviderProps {
    /**
     * The child nodes to render within the ThemeProvider.
     */
    children: React.ReactNode;
}

/**
 * Renders the MUI ThemeProvider with the current theme. This is in a separate component (and not
 * directly in VikuProviders) so it can grab the color mode context.
 *
 * @param props See VikuThemeProviderProps
 */
export default function VikuThemeProvider({ children }: VikuThemeProviderProps): JSX.Element {
    const theme = useTheme();
    return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
}

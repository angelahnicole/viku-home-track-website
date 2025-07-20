import { createContext, useContext, Dispatch, SetStateAction } from "react";
import type { ThemeMode } from "@/lib/theme";

// ================================================================

export const VikuThemeModeContext = createContext<
    | {
          mode: ThemeMode;
          setMode: Dispatch<SetStateAction<ThemeMode>>;
      }
    | undefined
>(undefined);

export function useVikuThemeMode() {
    const context = useContext(VikuThemeModeContext);
    if (!context) {
        throw new Error("useVikuThemeMode must be used within VikuThemeModeContext.Provider");
    }
    return context;
}

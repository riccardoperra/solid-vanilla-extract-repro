import { createThemeContract } from "@vanilla-extract/css";
import { ThemeVars } from "@vanilla-extract/css/dist/declarations/src/types";

export const themeColors: ThemeVars<{
  primary: string;
}> = createThemeContract({
  primary: "",
} as const);

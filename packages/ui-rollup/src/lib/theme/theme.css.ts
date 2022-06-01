import { createTheme, createThemeContract } from "@vanilla-extract/css";
import { ThemeVars } from "@vanilla-extract/css/dist/declarations/src/types";

export const themeColors: ThemeVars<{
  primary: string;
}> = createThemeContract({
  primary: "",
} as const);

export const theme1 = createTheme(themeColors, {
  primary: "green",
});

export const theme2 = createTheme(themeColors, {
  primary: "yellow",
});

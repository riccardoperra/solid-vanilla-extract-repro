import { createTheme } from "@vanilla-extract/css";
import { themeColors } from "@ui/vanilla-extract-rollup";

export const customThemeLocal = createTheme(themeColors, { primary: "red" });

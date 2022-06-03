import { globalStyle, style } from "@vanilla-extract/css";
import { uiVariables } from "@ui/vanilla-extract-rollup";

globalStyle("body", {
  fontFamily: "Inter, system-ui, -apple-system, sans-serif",
  "@supports": {
    "(font-variation-settings: normal)": {
      // Inter var
      fontFamily: "Inter,  system-ui, -apple-system, sans-serif",
    },
  },
});

export const testClass = style([
  {
    color: uiVariables.exampleVars.bg,
  },
]);

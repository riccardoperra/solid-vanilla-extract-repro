import { createTheme, style } from "@vanilla-extract/css";

export const [exampleTheme, exampleVars] = createTheme({
  bg: "black",
  color: "white",
});

export const buttonClassCustom = style([
  exampleTheme,
  {
    backgroundColor: exampleVars.bg,
    color: exampleVars.color,
  },
]);

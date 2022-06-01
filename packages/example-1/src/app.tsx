import type { Component } from "solid-js";
import { Button as ButtonFromRollup } from "@ui/vanilla-extract-rollup";
import { theme1, theme2 } from "@ui/vanilla-extract-rollup";
import { customThemeLocal } from "./styles/light-theme.css";

const App: Component = () => {
  // const [theme] = lightThemeCss;

  return (
    <div>
      <div class={theme2}>
        <ButtonFromRollup test={true} type={"button"} color={"test"}>
          Vanilla extract button
        </ButtonFromRollup>
      </div>

      <div class={theme1}>
        <ButtonFromRollup test={false} type={"button"} color={"test"}>
          Vanilla extract button
        </ButtonFromRollup>
      </div>

      <div class={customThemeLocal}>
        <ButtonFromRollup test={false} type={"button"} color={"test"}>
          Vanilla extract button
        </ButtonFromRollup>
      </div>
    </div>
  );
};

export default App;

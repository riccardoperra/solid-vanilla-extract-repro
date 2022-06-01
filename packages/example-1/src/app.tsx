import type { Component } from "solid-js";
import { Button as ButtonFromRollup, theme2 } from "@ui/vanilla-extract-rollup";
import { theme1 } from "@ui/vanilla-extract-rollup";
import { customThemeLocal } from "./styles/light-theme.css";

const App: Component = () => {
  return (
    <div class={theme1}>
      <div class={theme2}>
        <div class={customThemeLocal}>
          <ButtonFromRollup
            test={false}
            type={"button"}
            color={"test"}
          >
            Button 1
          </ButtonFromRollup>
        </div>
      </div>
    </div>
  );
};

export default App;

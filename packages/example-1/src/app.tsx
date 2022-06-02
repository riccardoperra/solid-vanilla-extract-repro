import type { Component } from "solid-js";
import { Button as ButtonFromRollup, theme2 } from "@ui/vanilla-extract-rollup";
import { theme1, uiVariables } from "@ui/vanilla-extract-rollup";
import { customThemeLocal } from "./styles/theme.css";
import { testClass } from "./styles/global.css";

const App: Component = () => {
  return (
    <div class={theme1}>
      <div class={testClass}>Test</div>

      <div class={theme2}>
        <div class={customThemeLocal}>
          <div class={uiVariables.buttonClassCustom}>
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
    </div>
  );
};

export default App;

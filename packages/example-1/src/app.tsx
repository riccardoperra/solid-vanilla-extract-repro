import type { Component } from "solid-js";
import { Button as ButtonFromRollup } from "@ui/vanilla-extract-rollup";
import { lightThemeCss } from "./styles/light-theme.css";

const App: Component = () => {
  // const [theme] = lightThemeCss;
  const theme = lightThemeCss;

  return (
    <div class={theme}>
      <div>
        <ButtonFromRollup test={true} type={"button"} color={"test"}>
          Vanilla extract button
        </ButtonFromRollup>

        <ButtonFromRollup test={false} type={"button"} color={"test"}>
          Vanilla extract button
        </ButtonFromRollup>
      </div>
    </div>
  );
};

export default App;

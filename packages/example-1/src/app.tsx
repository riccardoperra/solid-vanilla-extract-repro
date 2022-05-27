import type {Component} from 'solid-js';
import {Button} from "@ui/vanilla-extract";
import {Button as ButtonFromRollup} from "@ui/vanilla-extract-rollup";
import {lightThemeCss} from "./styles/light-theme.css";
// import {lightThemeCss} from "./styles/light-theme.css";

const App: Component = () => {
  // const [theme] = lightThemeCss;
  const theme = lightThemeCss;

  return (
    <div class={theme}>
      {/*<div>*/}
      {/*  <Button color={'test'}>Vanilla extract button</Button>*/}
      {/*</div>*/}

      <div>
        <ButtonFromRollup color={'test'}>Vanilla extract button</ButtonFromRollup>
      </div>
    </div>
  );
};

export default App;

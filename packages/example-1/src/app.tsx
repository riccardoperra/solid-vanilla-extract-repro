import type {Component} from 'solid-js';
import {Button} from "@ui/vanilla-extract";
import {lightThemeCss} from "./styles/light-theme.css";

const App: Component = () => {
  const [theme] = lightThemeCss;

  return (
      <div class={theme}>
        <div>
          <Button color={'test'}>Vanilla extract button</Button>
        </div>
      </div>
  );
};

export default App;

import {createEffect, on, ParentComponent} from 'solid-js';
import * as styles from './Scaffold.css';
import {lightThemeCss} from "../../styles/light-theme.css";

export const Scaffold: ParentComponent = props => {
  const mode = () => 'light';
  // const theme = () => (mode() === 'light' ? lightThemeCss : darkThemeCss);

  createEffect(
    on(mode, theme => {
      // const scheme = document.querySelector('meta[name="theme-color"]');
      // const body = document.body;
      // if (scheme) {
      //   const color = theme === 'dark' ? darkGrayScale.gray1 : '#FFFFFF';
      //   scheme.setAttribute('content', color);
      //   setElementVars(body, {
      //     [backgroundColorVar]: color,
      //   });
      // }
    }),
  );

  return (
    <div
      id={'app-scaffold'}
      class={`${styles.scaffold} ${lightThemeCss}`}
    >
      {props.children}
    </div>
  );
};

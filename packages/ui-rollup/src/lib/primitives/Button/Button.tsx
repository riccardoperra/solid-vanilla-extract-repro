import { JSX } from "solid-js";
import * as styles from "./Button.css";

export type ButtonProps = JSX.IntrinsicElements["button"] & styles.ButtonProps;

export function Button(props: ButtonProps) {
  return (
    <button
      {...props}
      class={styles.button({ test: props.test })}
    >
      {props.children}
    </button>
  );
}

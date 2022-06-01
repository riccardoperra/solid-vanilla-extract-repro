import {JSX, mergeProps} from "solid-js";
import * as styles from './Button.css';

export type ButtonProps = JSX.IntrinsicElements['button'] & styles.ButtonProps;

export function Button(props: ButtonProps) {
  const propsWithDefault = mergeProps({}, props);
  return (
    <button
      {...propsWithDefault}
      class={styles.button({
        test: props.test
      })}>
      {propsWithDefault.children}
    </button>
  )
}

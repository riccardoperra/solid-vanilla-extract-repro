import {JSX, mergeProps} from "solid-js";
import * as styles from './Button.css';

export type ButtonProps = {
  color: string;
} & JSX.IntrinsicElements['button'];

export function Button(props: ButtonProps) {
  const propsWithDefault = mergeProps({}, props);
  return (
    <button
      {...propsWithDefault}
      class={styles.button}
    >{propsWithDefault.children}</button>
  )
}

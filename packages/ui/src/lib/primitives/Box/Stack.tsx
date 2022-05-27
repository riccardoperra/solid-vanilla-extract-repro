import {Box, BoxProps} from './Box';
import * as styles from './Stack.css';
import {assignInlineVars} from '@vanilla-extract/dynamic';
import {globals} from '../../theme';

interface StackProps extends BoxProps {
  spacing: keyof typeof globals.spacing;
}

export const VStack = (props: StackProps) => {
  return (
    <Box
      {...props}
      class={styles.vStack}
      style={assignInlineVars({
        [styles.stackThemeVars.spacing]: globals.spacing[props.spacing],
      })}
    >
      {props.children}
    </Box>
  );
};

export const HStack = (props: StackProps) => {
  return (
    <Box
      {...props}
      class={styles.hStack}
      style={assignInlineVars({
        [styles.stackThemeVars.spacing]: globals.spacing[props.spacing],
      })}
    >
      {props.children}
    </Box>
  );
};

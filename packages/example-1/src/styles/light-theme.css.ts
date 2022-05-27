import {themeColors} from '@ui/vanilla-extract';
import {createTheme} from '@vanilla-extract/css';

export const lightThemeCss = createTheme(themeColors, {
  primary: 'red',
});

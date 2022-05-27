import {style} from '@vanilla-extract/css';
import {globals, themeColors} from '../../theme';

export const boxBase = style({
  '::-webkit-scrollbar': {
    width: '18px',
  },

  '::-webkit-scrollbar-track': {
    backgroundColor: 'transparent',
  },
  '::-webkit-scrollbar-thumb': {
    backgroundColor: themeColors.primary,
    borderRadius: globals.borderRadius.full,
    border: '6px solid transparent',
    backgroundClip: 'content-box',
    transition: 'background-color .2s',
  },

  selectors: {
    '&::-webkit-scrollbar-thumb:hover': {
      backgroundColor: themeColors.primary,
    },
  },
});

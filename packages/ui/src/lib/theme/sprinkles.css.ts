import {createSprinkles, defineProperties} from '@vanilla-extract/sprinkles';
import {root as globals} from './global.css';
import {themeColors} from "./theme.css";

export const responsiveProperties = defineProperties({
  conditions: {
    mobile: {},
    tablet: {'@media': 'screen and (min-width: 768px)'},
    desktop: {'@media': 'screen and (min-width: 1024px)'},
  },
  defaultCondition: 'mobile',
  properties: {
    cursor: ['default', 'pointer'],
    display: {
      none: 'none',
      block: 'block',
      inline: 'inline',
      inlineBlock: 'inline-block',
      inlineFlex: 'inline-flex',
      flex: 'flex',
    },
    position: ['relative', 'absolute', 'fixed'],
    alignItems: {
      flexStart: 'flex-start',
      center: 'center',
      flexEnd: 'flex-end',
    },
    justifyContent: {
      flexStart: 'flex-start',
      center: 'center',
      flexEnd: 'flex-end',
      spaceBetween: 'space-between',
    },
    flexDirection: {
      row: 'row',
      rowReverse: 'row-reverse',
      column: 'column',
      columnReverse: 'column-reverse',
    },
    flexWrap: {
      wrap: 'wrap',
      nowrap: 'nowrap',
    },
    flexShrink: [0],
    flexGrow: [0, 1],
    textAlign: ['left', 'center', 'right'],
    rowGap: globals.spacing,
    columnGap: globals.spacing,
    gap: globals.spacing,
    paddingTop: globals.spacing,
    paddingBottom: globals.spacing,
    paddingLeft: globals.spacing,
    paddingRight: globals.spacing,
    marginTop: globals.spacing,
    marginBottom: globals.spacing,
    marginLeft: globals.spacing,
    marginRight: globals.spacing,
    width: ['100vw', '100%'],
    height: ['100vh', '100%'],
    borderRadius: globals.borderRadius,
    fontSize: globals.fontSize,
    lineHeight: globals.lineHeight,
    boxShadow: globals.boxShadow,
  },
  shorthands: {
    padding: ['paddingTop', 'paddingBottom', 'paddingLeft', 'paddingRight'],
    paddingX: ['paddingLeft', 'paddingRight'],
    paddingY: ['paddingTop', 'paddingBottom'],
    margin: ['marginTop', 'marginBottom', 'marginLeft', 'marginRight'],
    marginX: ['marginLeft', 'marginRight'],
    marginY: ['marginTop', 'marginBottom'],
    placeItems: ['alignItems', 'justifyContent'],
    typeSize: ['fontSize', 'lineHeight'],
  },
});

const colorProperties = defineProperties({
  conditions: {
    lightMode: {},
    darkMode: {'@media': '(prefers-color-scheme: dark)'},
  },
  defaultCondition: 'lightMode',
  properties: {
    color: {
      primary: themeColors.primary,
    },
    backgroundColor: [],
    // etc.
  },
});

export const sprinkles = createSprinkles(responsiveProperties, colorProperties);

export type Sprinkles = Parameters<typeof sprinkles>[0];

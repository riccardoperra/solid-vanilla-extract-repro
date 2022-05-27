import {createTheme, createThemeContract} from '@vanilla-extract/css';

/**
 *
 * If `Theme Contract` is in an external library, throw error
 * 08:43:13 [vite] Internal server error: Build failed with 9 errors:
 * ../ui/dist/lib/primitives/Box/Box.js:1:17: error: No matching export in "../../node_modules/.pnpm/solid-js@1.4.3/node_modules/solid-js/web/dist/server.js" for import "insert"
 * ../ui/dist/lib/primitives/Box/Box.js:1:25: error: No matching export in "../../node_modules/.pnpm/solid-js@1.4.3/node_modules/solid-js/web/dist/server.js" for import "effect"
 * ../ui/dist/lib/primitives/Box/Box.js:1:33: error: No matching export in "../../node_modules/.pnpm/solid-js@1.4.3/node_modules/solid-js/web/dist/server.js" for import "setAttribute"
 * ../ui/dist/lib/primitives/Box/Box.js:1:47: error: No matching export in "../../node_modules/.pnpm/solid-js@1.4.3/node_modules/solid-js/web/dist/server.js" for import "className"
 * ../ui/dist/lib/primitives/Box/Box.js:1:58: error: No matching export in "../../node_modules/.pnpm/solid-js@1.4.3/node_modules/solid-js/web/dist/server.js" for import "template"
 *
 * How to reproduce:
 * - Comment the import
 * - Uncomment local theme contract
 */
import {themeColors} from '@ui/vanilla-extract-rollup';
// export const themeColors = createThemeContract({
//   primary: ''
// });

export const lightThemeCss = createTheme(themeColors, {
  primary: 'blue',
});

import {resolve} from 'path';
import {defineConfig} from 'vite';
import solidPlugin from 'vite-plugin-solid';

import {dependencies, peerDependencies} from './package.json';

const externals = [
  ...Object.keys(dependencies),
  ...Object.keys(peerDependencies),
  'solid-js/web',
  'solid-js/store',
];


export default defineConfig({
  plugins: [solidPlugin()],
  build: {
    target: 'esnext',
    polyfillDynamicImport: false,
    lib: {
      entry: 'src/index.tsx',
      name: '@ui/vanilla-extract',
      fileName: 'index',
      formats: ['es']
    },
    rollupOptions: {
      external: externals,
      output: {
        entryFileNames: '[name].js',
        preserveModules: true,
        format: 'esm'
      }
    }
  },
});

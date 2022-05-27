import {defineConfig} from 'vite';
import solidPlugin from 'vite-plugin-solid';
import WindiCSS from 'vite-plugin-windicss';
import {vanillaExtractPlugin} from "@vanilla-extract/vite-plugin";

export default defineConfig({
  plugins: [vanillaExtractPlugin(), solidPlugin(), WindiCSS()],
  build: {
    target: 'esnext',
    cssCodeSplit: true
  },
});

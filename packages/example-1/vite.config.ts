import {defineConfig} from 'vite';
import {vanillaExtractPlugin} from "@vanilla-extract/vite-plugin";
import solidPlugin from "vite-plugin-solid";

export default defineConfig({
  plugins: [solidPlugin(), vanillaExtractPlugin()],
  build: {
    target: 'esnext',
    cssCodeSplit: true
  },
});

import { defineConfig } from "vite";
import solidPlugin from "vite-plugin-solid";

const {
  vanillaExtractPlugin,
} = require("./vanilla-extract-latest/vanilla-extract-vite-plugin.cjs.prod.js");

export default defineConfig({
  plugins: [solidPlugin(), vanillaExtractPlugin()],
  build: {
    target: "esnext",
  },
});

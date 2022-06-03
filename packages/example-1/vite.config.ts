import { defineConfig } from "vite";
import solidPlugin from "vite-plugin-solid";
import { vanillaExtractPlugin } from "@vanilla-extract/vite-plugin";

// Not work
// const {
//   vanillaExtractPlugin,
// } = require("./vanilla-extract-latest/vanilla-extract-vite-plugin.cjs.prod.js");

export default defineConfig({
  plugins: [solidPlugin(), vanillaExtractPlugin()],
  build: {
    target: "esnext",
  },
});

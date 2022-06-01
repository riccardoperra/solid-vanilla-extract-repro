import withSolid from "rollup-preset-solid";
import { vanillaExtractPlugin } from "@vanilla-extract/rollup-plugin";
import { dependencies, peerDependencies } from "./package.json";

const externals = [
  ...Object.keys(peerDependencies),
  ...Object.keys(dependencies),
  "solid-js/web",
  "solid-js/store",
  "@vanilla-extract/recipes/createRuntimeFn",
];

export default withSolid({
  input: "src/index.tsx",
  targets: ["esm", "cjs"],
  plugins: [vanillaExtractPlugin()],
  external: externals,
  output: [
    {
      preserveModules: true,
      entryFileNames: "[name].js",
      assetFileNames({ name }) {
        return name?.replace(/^src\//, "") ?? "";
      },
      dir: "./dist/esm",
      format: "esm",
    },
    {
      preserveModules: true,
      entryFileNames: "[name].js",
      assetFileNames({ name }) {
        return name?.replace(/^src\//, "") ?? "";
      },
      dir: "./dist/cjs",
      format: "cjs",
    },
  ],
});

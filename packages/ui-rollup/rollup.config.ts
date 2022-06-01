import withSolid from "rollup-preset-solid";

export default withSolid({
  input: "src/index.tsx",
  targets: ["esm", "cjs"],
  output: [
    {
      preserveModules: true,
      entryFileNames: "[name].js",
      dir: "./dist/esm",
      format: "esm",
    },
    {
      preserveModules: true,
      entryFileNames: "[name].js",
      dir: "./dist/cjs",
      format: "cjs",
    },
  ],
});

import { resolve } from "path";
import { readFileSync, writeFileSync } from "fs";

/**
 * @description Workaround for vanilla extract exports fix
 *
 * {@link https://github.com/riccardoperra/codeimage/blob/main/scripts/patch-solid-exports.ts}
 */
const rootLib = resolve(
  __dirname,
  "packages",
  "example-1",
  "node_modules",
  "solid-js"
);

const solidJsPackageDef = `${rootLib}/package.json`;
const file = JSON.parse(readFileSync(solidJsPackageDef, "utf8"));

const applyPatch = process.env.APPLY_PATCH === "true";

if (applyPatch) {
  console.log("Apply patch");
  file.exports["./web"]["node"].import = "./web/dist/web.js";
} else {
  console.log("Remove patch");
  file.exports["./web"]["node"].import = "./web/dist/server.js";
}

writeFileSync(solidJsPackageDef, JSON.stringify(file, null, 2));

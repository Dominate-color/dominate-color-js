import path from "path";
import dts from "vite-plugin-dts";
import { defineConfig } from "vite";
import packageJson from "./package.json";
import nodeResolve from "@rollup/plugin-node-resolve";

const getPackageName = () => {
  return packageJson.name.split("/").at(-1) as string;
};

const getPackageNameCamelCase = () => {
  try {
    return getPackageName().replace(/-./g, (char) => char[1].toUpperCase());
  } catch (err) {
    throw new Error("Name property in package.json is missing.");
  }
};

// const fileName = {
//   es: `${getPackageName()}.mjs`,
//   cjs: `${getPackageName()}.cjs`,
//   iife: `${getPackageName()}.iife.js`,
// };

const fileName = {
  es: `${getPackageName()}.js`,
  umd: `${getPackageName()}.umd.js`,
  cjs: `${getPackageName()}.cjs`,
};

const formats = Object.keys(fileName) as Array<keyof typeof fileName>;

// export default defineConfig({
//   base: "./",
//   plugins: [dts({ insertTypesEntry: true })],
//   build: {
//     lib: {
//       entry: path.resolve(__dirname, "src/index.ts"),
//       name: getPackageNameCamelCase(),
//       formats,
//       fileName: (format) => fileName[format],
//     },
//     rollupOptions: {
//       output: {
//         extend: true,
//       },
//     },
//   },
// });

export default defineConfig({
  base: "./",
  plugins: [dts({ insertTypesEntry: true })],
  build: {
    target: "node",
    emptyOutDir: true,
    lib: {
      entry: path.resolve(__dirname, "src/index.ts"),
      name: getPackageNameCamelCase(),
      formats,
      fileName: (format) => fileName[format],
    },
    rollupOptions: {
      output: {
        extend: true,
      },
      external: ["fs", "path", "crypto"],
      plugins: [nodeResolve()],
    },
  },
});

import { defineConfig } from "vite";
import solidPlugin from "vite-plugin-solid";
import packageJson from "./package.json";
import dts from "vite-plugin-dts";
import path from "path";

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

const fileName = {
  es: `${getPackageName()}.mjs`,
  cjs: `${getPackageName()}.cjs`,
  iife: `${getPackageName()}.iife.js`,
};

const formats = Object.keys(fileName) as Array<keyof typeof fileName>;

export default defineConfig({
  base: "./",
  //@ts-ignore
  plugins: [solidPlugin(), dts({ insertTypesEntry: true })],
  build: {
    lib: {
      entry: path.resolve(__dirname, "src/index.ts"),
      name: getPackageNameCamelCase(),
      formats,
      //@ts-ignore
      fileName: (format) => fileName[format],
    },
    rollupOptions: {
      external: ["solid-js", "@dominate-color-js/core"],
      output: {
        exports: "named",
        globals: {
          "solid-js": "Solid",
          "@dominate-color-js/core": "dominate-color",
        },
      },
    },
  },
  worker: {
    rollupOptions: {
      output: {
        file: "dist/worker.js",
        format: "iife",
      },
    },
  },
});

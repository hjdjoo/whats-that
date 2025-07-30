import { resolve } from "path";
import { mergeConfig, defineConfig } from "vite";
import { crx, type ManifestV3Export } from "@crxjs/vite-plugin";
import baseConfig, { baseBuildOptions, baseManifest } from "./vite.config.base.ts";

const outDir = resolve(__dirname, "dist-firefox");

export default mergeConfig(
  baseConfig,
  defineConfig({
    plugins: [
      crx({
        manifest: {
          ...baseManifest,
          background: {
            scripts: [
              // "browser-polyfill.js",
              "src/background/index.ts"
            ]
          }
        } as ManifestV3Export,
        browser: "firefox",
        contentScripts: {
          injectCss: true
        }
      })
    ],
    build: {
      ...baseBuildOptions,
      outDir
    },
    publicDir: resolve(__dirname, "public")
  })
)
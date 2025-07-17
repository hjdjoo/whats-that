import { resolve } from "path"
import { type BuildOptions, defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import tailwindcss from '@tailwindcss/vite';
import tsconfigPaths from "vite-tsconfig-paths"
import { type ManifestV3Export } from '@crxjs/vite-plugin';

import manifest from "./manifest.json";
import pkg from "./package.json";

const isDev = process.env.NODE_ENV === "dev";

export const baseManifest = {
  ...manifest,
  version: pkg.version
} as ManifestV3Export;

export const baseBuildOptions: BuildOptions = {
  sourcemap: isDev,
  emptyOutDir: !isDev
}

export default defineConfig({
  plugins: [
    tailwindcss(),
    tsconfigPaths(),
    react(),
  ],
  publicDir: resolve(__dirname, "public")
})

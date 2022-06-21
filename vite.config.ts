/// <reference types="vitest" />

import { defineConfig } from "vite"
import vue from "@vitejs/plugin-vue"
import path from "path"
import svgLoader from "vite-svg-loader"

export default defineConfig({
  plugins: [vue(), svgLoader()],
  test: {
    globals: true,
    environment: "jsdom",
  },
  resolve: {
    alias: {
      components: path.resolve(__dirname, "./src/components"),
      views: path.resolve(__dirname, "./src/views"),
    },
  },
})

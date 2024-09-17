import { defineConfig as defineVitestConfig } from "vitest/config"
import { mergeConfig, defineConfig as defineViteConfig } from "vite"
import vue from "@vitejs/plugin-vue"
import path from "path"
import svgLoader from "vite-svg-loader"

const viteConfig = defineViteConfig({
  plugins: [svgLoader(), vue()],
  resolve: {
    alias: {
      components: path.resolve(__dirname, "./src/components"),
    },
  },
})

const vitestConfig = defineVitestConfig({
  test: {
    globals: true,
    environment: "jsdom",
  },
})

export default mergeConfig(viteConfig, vitestConfig)

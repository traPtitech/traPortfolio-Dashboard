/// <reference types="vitest" />

import { defineConfig } from 'vite'
import path from 'path'
import VuePlugin from '@vitejs/plugin-vue'

const srcPath = path.resolve(__dirname, 'src').replace(/\\/g, '/')

export default defineConfig(() => ({
  resolve: {
    alias: {
      '/@': srcPath
    }
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `
        @use "${srcPath}/styles/color" as *;
        @use "${srcPath}/styles/z-index" as *;
        @use "${srcPath}/styles/toast" as *;
        @use "${srcPath}/styles/scrollbar" as *;
        `
      }
    }
  },
  plugins: [VuePlugin()],
  test: {
    globals: true
  }
}))

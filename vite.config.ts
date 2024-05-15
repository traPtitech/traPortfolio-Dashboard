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
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:4010',
        rewrite: path => path.replace('/api/v1', '/'),
        changeOrigin: true
      }
    }
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `
        @import "${srcPath}/styles/color.scss";
        @import "${srcPath}/styles/z-index.scss";
        @import "${srcPath}/styles/toast.scss";
        @import "${srcPath}/styles/scrollbar.scss";
        `
      }
    }
  },
  plugins: [VuePlugin()],
  test: {
    globals: true
  }
}))

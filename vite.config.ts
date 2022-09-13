import { UserConfig } from 'vite'
import path from 'path'
import VuePlugin from '@vitejs/plugin-vue'
import PurgeIcons from 'vite-plugin-purge-icons'

const srcPath = path.resolve(__dirname, 'src').replace(/\\/g, '/')

const config: UserConfig = {
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
        additionalData: `@import "${srcPath}/styles/common.scss";`
      }
    }
  },
  plugins: [VuePlugin(), PurgeIcons()]
}

export default config

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import router from './router'
import App from './App.vue'
import type { PluginOptions } from 'vue-toastification'
import Toast, { POSITION } from 'vue-toastification'
import 'vue-toastification/dist/index.css'

import './index.scss'

const enableMocking = async () => {
  if (!import.meta.env.DEV) {
    return
  }

  const { worker } = await import('./mocks/handler')

  // `worker.start()` returns a Promise that resolves
  // once the Service Worker is up and ready to intercept requests.
  return worker.start({ onUnhandledRequest: 'bypass' })
}

const options: PluginOptions = {
  position: POSITION.BOTTOM_LEFT,
  maxToasts: 5,
  timeout: 3000,
  closeButton: false,
  pauseOnHover: false,
  pauseOnFocusLoss: false,
  hideProgressBar: true,
  closeOnClick: false,
  draggable: false,
  transition: 'Vue-Toastification__fade'
}

enableMocking().then(() => {
  const pinia = createPinia()
  const app = createApp(App)

  app.use(router)
  app.use(pinia)
  app.use(Toast, options)
  app.mount('#app')
})

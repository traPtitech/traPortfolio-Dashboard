import { createApp } from 'vue'
import { createPinia } from 'pinia'
import router from './router'
import App from './App.vue'
import type { PluginOptions } from 'vue-toastification'
import Toast, { POSITION } from 'vue-toastification'
import 'vue-toastification/dist/index.css'

import './index.scss'

const pinia = createPinia()
const app = createApp(App)

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

app.use(router)
app.use(pinia)
app.use(Toast, options)
app.mount('#app')

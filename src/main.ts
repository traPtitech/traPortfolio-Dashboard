import { createApp } from 'vue'
import router from './router'
import store from './store'
import App from './App.vue'

import './index.scss'
import '@purge-icons/generated'

const app = createApp(App)
app.use(router)
app.use(store)
app.mount('#app')

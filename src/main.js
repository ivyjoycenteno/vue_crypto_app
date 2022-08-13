import { createApp } from 'vue'
import App from './App.vue'
import './index.css'
import { createPinia } from 'pinia'
import router from './router'
import i18n from './plugins/i18n'

const pinia = createPinia()
const app = createApp(App)

app.use(pinia).use(router).use(i18n).mount('#app')

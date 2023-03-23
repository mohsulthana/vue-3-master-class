import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import AppDate from '@/components/AppDate.vue'

// import './assets/main.css'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.component('AppDate', AppDate)

app.mount('#app')

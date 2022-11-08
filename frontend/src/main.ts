import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

import './assets/fa/css/fontawesome.css'
import './assets/fa/css/solid.css'
import './assets/fa/css/brands.css'
import './assets/fa/js/solid'
import './assets/fa/js/brands'
import './assets/fa/js/fontawesome'

import './assets/main.scss'
import 'bootstrap'

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.mount('#app')

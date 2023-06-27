// import './assets/css/aos.css'
// import './assets/css/bootstrap.min.css'
// import './assets/css/bootstrap-icons.css'
// import './assets/css/magnific-popup.css'
// import './assets/css/templatemo-nomad-force.css'

import { createApp, markRaw } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

const app = createApp(App)
const pinia = createPinia()

pinia.use(({ store }) => {
  store.router = markRaw(router)
})
app.use(pinia)
app.use(router)

app.mount('#app')

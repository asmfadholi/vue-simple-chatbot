import { createApp } from 'vue'
import Counter from '..'
import App from './App.vue'

const app = createApp(App)

app.use(Counter)

app.mount('#app')
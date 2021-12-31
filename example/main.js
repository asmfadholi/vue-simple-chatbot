import { createApp } from 'vue'
import VueChatbot from '../src'
import App from './App.vue'

const app = createApp(App)

app.use(VueChatbot)

app.mount('#app')
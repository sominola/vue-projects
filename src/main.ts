import './assets/main.css'

import { createApp } from 'vue'
import { createPinia, defineStore } from 'pinia'

import App from './App.vue'
import router from './router'
import { useGlobalStore } from "@/stores/global";
import { useAuthStore } from './stores/auth'
import { AuthService } from './services/auth.service'

const app = createApp(App)
app.use(createPinia())
app.use(router)

export let globalStore: any;
router.beforeEach(async () => {
    globalStore = useGlobalStore();
})

app.mount('#app')

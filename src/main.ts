import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import { useGlobalStore, type GlobalStore } from "@/stores/global";
import { AuthService } from './services/auth.service'
import { useAuthStore, type AuthStore } from './stores/auth'

const app = createApp(App)
app.use(createPinia())
app.use(router)

export let globalStore: GlobalStore;
router.beforeEach(async () => {
    globalStore = useGlobalStore();
    const hasToken = () => localStorage.getItem('access_token') != null;
    const initUser = hasToken() ? (await AuthService.getCurrentUser()).data : null;
    const authStore = useAuthStore() as any;
    authStore.user = initUser;
})

app.mount('#app')

import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import {useGlobalStore} from "@/stores/global";

const app = createApp(App)
export let globalStore: typeof useGlobalStore;
app.use(createPinia())
app.use(router)

router.beforeEach(() => {
    globalStore = useGlobalStore();
})

app.mount('#app')

import './assets/main.css'

import {createApp} from 'vue'
import {createPinia} from 'pinia'

import App from './App.vue'
import router from './router'
import {useGlobalStore} from "@/stores/global";

const app = createApp(App)
app.use(createPinia())
app.use(router)

export let globalStore: any;
router.beforeEach(async () => {
    globalStore = useGlobalStore();
})

app.mount('#app')

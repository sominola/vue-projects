import {ref} from 'vue'
import {defineStore} from 'pinia'

export const useGlobalStore = defineStore('global', () => {
    const loading = ref(false);

    const start = () => {
        loading.value = true;
    }
    const finish = () => {
        loading.value = false;
    }
    return {start, finish, loading}
});
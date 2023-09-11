import { ref, watch, type Ref } from 'vue'
import { defineStore } from 'pinia'

export interface GlobalStore {
    loading: Ref<boolean>;
    start: () => void;
    finish: () => void;
    isDarkTheme: Ref<boolean>;
}

const checkIfDarkTheme = () => {
    const theme = localStorage.getItem('theme') ?? 'dark';
    document.documentElement.setAttribute('data-theme', theme);
    return theme === 'dark';
}

export const useGlobalStore = defineStore('global', () => {
    const loading = ref(false);
    const isDarkTheme = ref(checkIfDarkTheme());

    watch(() => isDarkTheme.value!, () => {
        if (isDarkTheme.value) {
            localStorage.setItem('theme', 'dark');
            document.documentElement.setAttribute('data-theme', 'dark');
        }
        else {
            localStorage.setItem('theme', 'light');
            document.documentElement.setAttribute('data-theme', 'light');
        }
    })

    const start = () => {
        loading.value = true;
    }
    const finish = () => {
        loading.value = false;
    }

    return { start, finish, loading, isDarkTheme } as GlobalStore;
});
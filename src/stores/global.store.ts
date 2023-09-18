import {defineStore} from 'pinia'

const checkIfDarkTheme = () => {
    const theme = localStorage.getItem('theme') ?? 'dark';
    document.documentElement.setAttribute('data-theme', theme);
    return theme === 'dark';
}
export const useGlobalStore = defineStore('global', {
    state: () => ({ loading: false, isDarkTheme: checkIfDarkTheme() }),
    actions: {
        start() {
            this.loading = true;
        },

        finish() {
            this.loading = false;
        }
    }
});
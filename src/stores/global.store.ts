import {defineStore} from 'pinia'
import type {ChatDto} from "@/common/types/chat/chat.dto";

type GlobalStateStore = {
    isDarkTheme: boolean,
    loading: boolean,
    selectedChat: ChatDto | null,
}
const checkIfDarkTheme = () => {
    const theme = localStorage.getItem('theme') ?? 'dark';
    document.documentElement.setAttribute('data-theme', theme);
    return theme === 'dark';
}
export const useGlobalStore = defineStore('global', {
    state: (): GlobalStateStore => ({loading: false, isDarkTheme: checkIfDarkTheme(), selectedChat: null}),
    actions: {
        start() {
            this.loading = true;
        },

        finish() {
            this.loading = false;
        }
    }
});
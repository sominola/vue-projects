import {ref} from 'vue'
import {defineStore} from 'pinia'
import type {SignInDto, SignUpDto, UserDto} from "@/types/types";


export const useAuthStore = defineStore('auth', () => {
    const user = ref<UserDto| null>(null);

    const signUp = async (model: SignUpDto) => {
       
    };
    const signIn = async (model: SignInDto) => {
      
    };
    const logout = () => {
        user.value = null;
    }
     const refreshToken = () => {
        user.value = null;
    }

    return {user, signUp, signIn, logout, refreshToken}
});

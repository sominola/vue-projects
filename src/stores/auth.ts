import { ref, type Ref } from 'vue'
import { defineStore } from 'pinia'
import type { SignInDto, SignUpDto, UserDto } from "@/types/types";
import { AuthService } from "@/services/auth.service";
import { toast } from "vue-sonner";
import { checkIfHttpError } from "@/helpers/http.helper";
import type { AxiosResponse } from 'axios';

export const useAuthStore = defineStore('auth', async () => {
    const user = ref<UserDto | null>(null);

    const signUp = async (model: SignUpDto) => {
        const response = await AuthService.signUp(model);
        const [isError, error] = checkIfHttpError(response);

        if (isError) {
            toast.error(error!.message);
            return;
        }

        user.value = response.data.user;
        localStorage.setItem('access_token', response.data.tokens.accessToken);
        localStorage.setItem('refresh_token', response.data.tokens.refreshToken);

        toast.success('Sign Up successful');
    };

    const signIn = async (model: SignInDto) => {
        const response = await AuthService.signIn(model);
        const [isError, error] = checkIfHttpError(response);

        if (isError) {
            toast.error(error!.message);
            return;
        }

        user.value = response.data.user;
        localStorage.setItem('access_token', response.data.tokens.accessToken);
        localStorage.setItem('refresh_token', response.data.tokens.refreshToken);

        toast.success('Sign In successful');
    };

    const logout = async () => {
        const refreshToken = localStorage.getItem('refresh_token');
        if (refreshToken)
            await AuthService.logout(refreshToken);
        user.value = null;
    }

    const refreshToken = async () => {
        const accessToken = localStorage.getItem('access_token');
        const refreshToken = localStorage.getItem('refresh_token');

        if (accessToken && refreshToken) {
            const response = await AuthService.refreshToken({ accessToken, refreshToken }) as AxiosResponse;
            const [isError] = checkIfHttpError(response);

            if (!isError) {
                localStorage.setItem('access_token', response.data.tokens.accessToken);
                localStorage.setItem('refresh_token', response.data.tokens.refreshToken);
            }
        }
    }

    return { user, signUp, signIn, logout, refreshToken };
})

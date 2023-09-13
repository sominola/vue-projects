import { defineStore } from 'pinia'
import type { SignInDto, SignUpDto, UserDto, UserUpdateDto } from "@/types/types";
import { AuthService } from "@/services/auth.service";
import { toast } from "vue-sonner";
import { checkIfHttpError } from "@/helpers/http.helper";
import type { AxiosResponse } from 'axios';
import router from '@/router';

export const useAuthStore = defineStore('auth', {
    state: () => ({ user: null as UserDto | null }),
    actions: {
        async signUp(model: SignUpDto) {
            const response = await AuthService.signUp(model);
            const [isError, error] = checkIfHttpError(response);

            if (isError) {
                toast.error(error!.message);
                return;
            }

            this.user = response.data.user;
            localStorage.setItem('access_token', response.data.tokens.accessToken);
            localStorage.setItem('refresh_token', response.data.tokens.refreshToken);

            toast.success('Sign Up successful');
            router.push('/settings/profile');
        },

        async signIn(model: SignInDto) {
            const response = await AuthService.signIn(model);
            const [isError, error] = checkIfHttpError(response);

            if (isError) {
                toast.error(error!.message);
                return;
            }

            this.user = response.data.user;
            localStorage.setItem('access_token', response.data.tokens.accessToken);
            localStorage.setItem('refresh_token', response.data.tokens.refreshToken);

            toast.success('Sign In successful');
            router.push('/settings/profile');
        },

        async logout() {
            const refreshToken = localStorage.getItem('refresh_token');
            if (refreshToken)
                await AuthService.logout(refreshToken);

            this.user = null;
            localStorage.removeItem('access_token');
            localStorage.removeItem('refresh_token');
            router.push('/sign-in');
        },

        async refreshToken() {
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
        },
        async updateUser(model: UserUpdateDto) {
            const response = await AuthService.updateUser(model);
            const [isError, error] = checkIfHttpError(response);

            if (isError && error?.message) {
                toast.error(error?.message)
                return;
            }

            this.user = response.data;
            toast.success('User Profiled updated success');
        }
    }
});
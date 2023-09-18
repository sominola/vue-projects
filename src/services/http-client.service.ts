import axios from "axios";
import { AuthService } from "@/services/auth.service"
import { globalStore } from "@/main";
import { useAuthStore } from "@/stores/auth.store";
import { toast } from "vue-sonner";

const API_URL = (import.meta as any).env.VITE_API_URL;

export const HttpClientService = axios.create({
    withCredentials: true,
    baseURL: API_URL
})

let countPending = 0;
const requestFinished = () => {
    countPending--;
    if (countPending === 0)
        globalStore.finish();
}


HttpClientService.interceptors.request.use(async (config) => {
    globalStore.start();
    countPending++;

    const accessToken = localStorage.getItem('access_token');
    if (accessToken)
        config.headers.Authorization = `Bearer ${accessToken}`

    return config;
}, async () => {
    requestFinished()
})

async function refreshAccessToken() {

    const authStore = useAuthStore();

    if (!authStore) {
        throw Error('Please inject store in refresh-token-interceptor');
    }
    await authStore.refreshToken();

    const newToken = localStorage.get('access_token');

    if (!newToken)
        throw Error('Token not refreshed');

    return newToken;
}

HttpClientService.interceptors.response.use(config => {
    requestFinished()
    return config;
}, async (error) => {
    console.log(error)
    const originalRequest = error.config;
    if (error.response?.status === 401 && !originalRequest._retry && AuthService.hasAccessToken()) {
        originalRequest._retry = true;
        return refreshAccessToken().then(accessToken => {
            originalRequest.headers.Authorization = `Bearer ${accessToken}`;
            requestFinished();
            return axios(originalRequest);
        }).catch(() => {
            localStorage.remove('access_token');
            localStorage.remove('refresh_token');
            requestFinished();
        })
    } else if (error.code === 'ERR_NETWORK') {
        toast.error('No internet connection')
    }

    requestFinished();
    return error;
})
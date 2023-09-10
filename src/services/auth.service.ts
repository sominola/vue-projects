import type { AuthUserDto, SignInDto, SignUpDto, TokensDto, UserDto } from "@/types/types";
import $api from "./http-client";
import type { AxiosPromise } from "axios";

export class AuthService {

    static async login(auth: SignInDto): AxiosPromise<AuthUserDto> {
        return await $api.post<AuthUserDto>('/auth/login', auth);
    }

    static async registration(auth: SignUpDto): AxiosPromise<AuthUserDto> {
        return await $api.post<AuthUserDto>('/auth/register', auth);
    }

    static async logout(refreshToken: string): AxiosPromise<void> {
        return await $api.post<void>('/auth/revoke', {refreshToken: refreshToken});
    }

    static async refreshToken(tokens: TokensDto): AxiosPromise<TokensDto> {
        return await $api.post<TokensDto>('/auth/refresh', tokens);
    }

    static async getCurrentUser(): AxiosPromise<UserDto> {
        return await $api.get<UserDto>('/auth/current');
    }

    static hasAccessToken(): boolean {
        return localStorage.get('access_token') != null;
    }
}
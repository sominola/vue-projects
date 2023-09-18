import type {
    ActiveSessionDto,
    AuthUserDto,
    Paginated,
    SignInDto,
    SignUpDto,
    TokensDto,
    UserDto,
    UserUpdateDto
} from "@/common/types/types";
import type {AxiosPromise} from "axios";
import {HttpClientService as http} from "@/services/services"

const options = {
    weekday: "short",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
} as any;

const former = Intl.DateTimeFormat('default', options);
const formatDate = (date: Date | string): string => {
    if (date instanceof Date) return former.format(date);
    else if (typeof date === 'string') return former.format(new Date(date));
    return '';
}

export class AuthService {

    static async signIn(auth: SignInDto): AxiosPromise<AuthUserDto> {
        return await http.post<AuthUserDto>('/auth/login', auth);
    }

    static async signUp(auth: SignUpDto): AxiosPromise<AuthUserDto> {
        return await http.post<AuthUserDto>('/auth/register', auth);
    }

    static async logout(refreshToken: string): AxiosPromise<void> {
        return await http.post<void>('/auth/revoke', { refreshToken: refreshToken });
    }

    static async refreshToken(tokens: TokensDto): AxiosPromise<TokensDto> {
        return await http.post<TokensDto>('/auth/refresh', tokens);
    }

    static async getCurrentUser(): AxiosPromise<UserDto> {
        return await http.get<UserDto>('/auth/current');
    }

    static async updateUser(user: UserUpdateDto): AxiosPromise<UserDto> {
        return await http.put<UserDto>('/auth/current', user);
    }

    static async getActiveSessions(): AxiosPromise<Paginated<ActiveSessionDto>> {
        return await http.get<Paginated<ActiveSessionDto>>('/auth/sessions')
            .then(response => {
                response.data.items.forEach(session => {
                    session.lastActiveAt = formatDate(session.lastActiveAt)
                });
                return response;
            });
    }


    static hasAccessToken(): boolean {
        return localStorage.get('access_token') != null;
    }
}
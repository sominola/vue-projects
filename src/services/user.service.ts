import type {UserDto} from "@/common/types/types";
import type {AxiosPromise} from "axios";
import {HttpClientService} from "@/services/services";

export class UserService {

    static async getUsers(userIds: number[]): AxiosPromise<UserDto[]> {
        return await HttpClientService.post<UserDto[]>('/user/search', {userIds});
    }
}
import {defineStore} from "pinia";
import type {UserDto} from "@/common/types/types";
import {UserService} from "@/services/user.service";

export const useUsersStore = defineStore('users', {
    state: () => ({users: new Map<number, UserDto>}),
    getters: {
        async getUsers(state: any) {
            return async (userIds: number[]) => {
                const noExistsUsers = new Array<number>;
                const users = userIds.map(userId => {
                    const user = state.users.get(userId);
                    if (user == null)
                        noExistsUsers.push(userId)
                    return user;
                }).filter(user => user !== undefined) as UserDto[];

                const newUsers = (await UserService.getUsers(noExistsUsers)).data as UserDto[];
                if (noExistsUsers.length !== newUsers.length) {
                    throw new Error('NoExistsUsers length not equals new users! System error!')
                }
                newUsers.forEach(user => state.users[user.id] = user);
                users.push(...newUsers);

                return users;
            }
        }
    }
});
import {defineStore} from "pinia";
import {type UserDto} from "@/common/types/types";
import {signlaR} from "@/services/services";

type UsersStoreState = {
    users: UserDto[];
};

export const useUsersStore = defineStore('users', {
    state: (): UsersStoreState => ({ users: [] }),
    getters: {
        getUserById: (state) => {
            return (userId: number) => {
                const test = state.users.find(x => x.id == userId);
                return test;
            };
        },
    },
    actions: {
        async addUsers(userIds: number[]) {
            const notExistsUserIds = [] as number[];

            for (const userId of userIds) {
                if (!this.users.find(x => x.id == userId))
                    notExistsUserIds.push(userId);
            }

            if (notExistsUserIds.length > 0) {
                const users = await signlaR.getUsers(notExistsUserIds);
                if (users) {
                    for (const newUser of users) {
                        this.users.push(newUser);
                    }
                }
            }
        },

        updateUserState(user: UserDto) {
            const index = this.users.findIndex(x => x.id === user.id);

            if (index !== -1) {
                this.users.splice(index, 1, user);
            }
        }
    }
});
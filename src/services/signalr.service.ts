import type {UserDto} from "@/common/types/types";
import type {HubConnection} from "@microsoft/signalr";
import * as signalR from "@microsoft/signalr";

class SignalrService {

    connection!: HubConnection;

    async init(): Promise<HubConnection> {
        if (this.connection)
            return this.connection;

        const hubUrl = (import.meta as any).env.VITE_SIGNALR_URL;
        const connect = new signalR.HubConnectionBuilder()
            .withUrl(hubUrl, { accessTokenFactory: () => localStorage.getItem('access_token')! })
            .build();

        this.connection = connect;
        await connect.start();

        return this.connection;
    }

    async getUsers(userIds: number[]): Promise<UserDto[]> {
        return await this.connection.invoke('GetUsers', { userIds }).then(x => x);
    }
}

export const signlaR = new SignalrService();
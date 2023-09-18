import type { MessageDto, UserDto } from '@/common/types/types';
import type { HubConnection } from '@microsoft/signalr';
import { defineStore } from 'pinia'

type SignalrStateStore = {
    lastMessage: MessageDto | null;
    lastUpdatedUser: UserDto | null;
    hubConnection: HubConnection | null;
}

export const useSignalrStore = defineStore('signalr', {
    state: (): SignalrStateStore => ({ lastMessage: null, lastUpdatedUser: null, hubConnection: null }),
});
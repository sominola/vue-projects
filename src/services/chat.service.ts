import type {
    AddMembersRequest,
    ChatDto,
    CreateChatRequest,
    MessageDto,
    MessageRequest,
    Paginated,
    Pagination
} from "@/common/types/types";
import type {AxiosPromise} from "axios";
import {HttpClientService} from "@/services/services";

export class ChatService {

    static async getChats(pagination: Pagination | null = null): AxiosPromise<Paginated<ChatDto>> {
        return await HttpClientService.get<Paginated<ChatDto>>('/chat', {params: pagination})
            .then(response => {
                response.data.items.forEach(item => {
                    if (item.lastMessage?.createdAt)
                        item.lastMessage.createdAt = new Date(item.lastMessage.createdAt);
                });

                return response;
            })
    }

    static async getChat(chatId: string): AxiosPromise<ChatDto> {
        return await HttpClientService.get<ChatDto>(`/chat/${chatId}`)
            .then(response => {
                if (response.data?.lastMessage?.createdAt)
                    response.data.lastMessage.createdAt = new Date(response.data.lastMessage.createdAt);
                return response;
            });
    }

    static async sendMessage(message: MessageRequest): AxiosPromise {
        return await HttpClientService.post(`/chat/message`, message);
    }

    static async createPersonalChat(userId: number): AxiosPromise<ChatDto> {
        return await HttpClientService.post<ChatDto>(`/chat/personal/${userId}`);
    }

    static async createGroupChat(request: CreateChatRequest): AxiosPromise {
        return await HttpClientService.post(`/chat/group`, request);
    }

    static async addMembersToGroupChat(request: AddMembersRequest): AxiosPromise {
        return await HttpClientService.post(`/chat/group/members`, request);
    }

    static async getChatMessages(chatId: string, pagination: Pagination | null = null): AxiosPromise<Paginated<MessageDto>> {
        return await HttpClientService.get<Paginated<MessageDto>>(`/chat/${chatId}/messages`, {params: pagination})
            .then(response => {
                response.data.items.forEach(item => {
                    item.createdAt = new Date(item.createdAt);
                });

                return response;
            })
    }
}
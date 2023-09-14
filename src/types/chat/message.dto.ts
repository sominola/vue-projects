import type {UserDto} from "@/types/types";

export type MessageDto = {
    id: string;
    text: string;
    chatId: string;
    createdAt: Date;
    sender: UserDto;
}
import type {UserDto} from "@/common/types/types";

export type MessageDto = {
    id: string;
    text: string;
    chatId: string;
    createdAt: Date;
    sender: UserDto;
}
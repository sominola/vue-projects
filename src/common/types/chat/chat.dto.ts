import type {MessageDto} from "@/common/types/chat/message.dto";

export type ChatDto ={
    id: string;
    type: string;
    name: string;
    avatarUrl: string;
    lastMessage?: MessageDto | null;
    memberIds: number[];
}
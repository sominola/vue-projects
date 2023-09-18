import type {ChatType} from "@/common/enums/enums";
import type {MessageDto} from "@/common/types/chat/message.dto";

export type ChatDto = {
    id: string;
    type: ChatType;
    name: string;
    avatarUrl: string;
    lastMessage?: MessageDto | null;
    memberIds: number[];
}
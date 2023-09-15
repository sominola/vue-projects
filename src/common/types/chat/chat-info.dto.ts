import type {MessageDto, UserDto} from "@/common/types/types";
import {ChatType} from "@/common/enums/enums";

export type ChatInfoDto = {
    id: string;
    type: ChatType;
    name: string;
    avatarUrl: string;
    lastMessage: MessageDto | null;
    members: UserDto[];
}
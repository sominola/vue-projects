import type {UserDto} from "@/types/types";

export type ChatInfoDto = {
    id: string;
    type: ChatType;
    name: string;
    avatarUrl: string;
    lastMessage: MessageDto | null;
    members: UserDto[];
}
export enum ChatType {
    Personal = 'Personal',
    Group = 'Group',
}
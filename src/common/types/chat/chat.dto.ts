import type {UserDto} from "@/common/types/types";

export type ChatDto ={
    id: string;
    type: string;
    name: string;
    avatar: string;
    members: UserDto[];
}
import type {UserDto} from "@/types/types";

export type ChatDto ={
    id: string;
    type: string;
    name: string;
    avatar: string;
    members: UserDto[];
}
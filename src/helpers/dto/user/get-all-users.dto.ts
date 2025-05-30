import {UserDto} from "@/helpers";

export type GetAllUsersResponseDto = {
    isValid: boolean;
    message: string;
    users?: UserDto[]
    total?: number
};
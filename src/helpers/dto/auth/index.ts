import {UserDto} from "../user";

export type SignInResponseDto = {
    isValid: boolean;
    access_token?: string;
    message:
        | string
        | {
        user: UserDto;
        // access_token: string; refresh_token: string
    };
};

export type VerifyEmailResponseDto = {
    isValid: boolean;
    message: string;
    user?: UserDto;
}
export type CreateUserResponseDto = {
    isValid: boolean;
    message: string;
    access_token?: string;
};
export type UserDto = {
    id?: string;
    uuid?: string;
    firstName: string;
    lastName: string;
    username?: string;
    email: string;
    password?: string;
    cpf?: string;
    phone?: string;
    associateNumber?: string;
    role?: string;
    active?: boolean;
    welcomeEmail?: boolean;
    launchEmail?: boolean;
    legacyUser?: boolean;
};
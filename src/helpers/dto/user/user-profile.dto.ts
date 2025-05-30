export type UserProfileResponseDto = {
    isValid: boolean,
    message: string,
    user?: UserProfileDto
}

export type UserProfileDto = {
    id: number,
    uui: string,
    firstName: string,
    lastName: string,
    username: string,
    email: string,
    cpf: string,
    phone: string,
    associateNumber: number
}
export type CreateUserAddressResponseDTO = {
    isValid: boolean,
    message: string,
    address?: CreateUserAddressResponseDTO,
}

export type CreateUserAddressDTO = {
    uuid?: string,
    street: string
    number: string
    complement: string
    city: string
    state: string
    zipCode: string
    isDefault: boolean
}
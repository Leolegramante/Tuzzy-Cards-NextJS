export type CreateUserAddressResponseDTO = {
    isValid: boolean,
    message: string,
}

export type CreateUserAddressDTO = {
    street: string
    number: string
    complement: string
    city: string
    state: string
    zipCode: string
    isDefault: boolean
}
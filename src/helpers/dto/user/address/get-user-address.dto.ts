export type GetUserAddressResponseDTO = {
    isValid: boolean;
    message: string;
    address: Address[]
}
export type Address = {
    id?: number
    street: string
    number: string
    complement: string
    city: string
    state: string
    zipCode: string
    isDefault: boolean
}
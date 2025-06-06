import {UserDto} from "@/helpers";

export type GetUserAddressResponseDTO = {
    isValid: boolean;
    message: string;
    user: UserWithAddress
}

interface UserWithAddress extends UserDto {
    addresses: Address[]
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
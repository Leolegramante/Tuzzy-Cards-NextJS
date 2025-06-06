'use server'

import {
    CreateUserAddressDTO,
    CreateUserAddressResponseDTO,
    getJWT,
    getSession,
    UserProfileResponseDto
} from "@/helpers";

export const GetUserAddresses = async (): Promise<UserProfileResponseDto> => {
    const userSession = await getSession()
    if (!userSession) return {isValid: false, message: 'Error'}

    const token = await getJWT()
    if (!token) return {isValid: false, message: 'Error'}

    const response = await fetch(`${process.env.BASE_URL}/users/address/${userSession.uuid}`, {
        method: "GET",
        headers: {
            Accept: "application/json",
            'Authorization': `Bearer ${token}`,
            "Content-Type": "application/json",
        },
    })

    if (!response.ok) {
        return {isValid: false, message: `${response.status}`};
    }

    const responseData: UserProfileResponseDto = await response.json();
    if (responseData.isValid) {
        return responseData;
    }

    return {isValid: false, message: `${response.status}`};
}

export const CreateUserAddress = async (createUserAddress: CreateUserAddressDTO): Promise<CreateUserAddressResponseDTO> => {
    const userSession = await getSession()
    if (!userSession) return {isValid: false, message: 'Error'}

    const token = await getJWT()
    if (!token) return {isValid: false, message: 'Error'}

    const response = await fetch(`${process.env.BASE_URL}/users/address`, {
        method: "GET",
        headers: {
            Accept: "application/json",
            'Authorization': `Bearer ${token}`,
            "Content-Type": "application/json",
        },
        body: JSON.stringify(createUserAddress),
    })

    if (!response.ok) {
        return {isValid: false, message: `${response.status}`};
    }

    const responseData: CreateUserAddressResponseDTO = await response.json();
    if (responseData.isValid) {
        return responseData;
    }

    return {isValid: false, message: `${response.status}`};
}
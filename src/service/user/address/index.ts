'use server'

import {
    CreateUserAddressDTO,
    CreateUserAddressResponseDTO,
    GetAddressFromZipCodeDto,
    getJWT,
    getSession,
    GetUserAddressResponseDTO
} from "@/helpers";

export const GetUserAddresses = async (): Promise<GetUserAddressResponseDTO> => {
    const userSession = await getSession()
    if (!userSession) return {isValid: false, message: 'Error', address: []}

    const token = await getJWT()
    if (!token) return {isValid: false, message: 'Error', address: []}

    const response = await fetch(`${process.env.BASE_URL}/users/address/${userSession.uuid}`, {
        method: "GET",
        headers: {
            Accept: "application/json",
            'Authorization': `Bearer ${token}`,
            "Content-Type": "application/json",
        },
    })

    if (!response.ok) {
        return {isValid: false, message: `${response.status}`, address: []};
    }

    const responseData: GetUserAddressResponseDTO = await response.json();
    if (responseData.isValid) {
        return responseData;
    }

    return {isValid: false, message: `${response.status}`, address: []};
}

export const CreateUserAddress = async (createUserAddress: CreateUserAddressDTO): Promise<CreateUserAddressResponseDTO> => {
    const userSession = await getSession()
    if (!userSession) return {isValid: false, message: 'Error'}

    const token = await getJWT()
    if (!token) return {isValid: false, message: 'Error'}

    createUserAddress.uuid = userSession.uuid

    const response = await fetch(`${process.env.BASE_URL}/users/address`, {
        method: "POST",
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

export const GetAddressFromZipCode = async (zipCode: string): Promise<GetAddressFromZipCodeDto> => {
    const userSession = await getSession()
    if (!userSession) return {isValid: false}

    const token = await getJWT()
    if (!token) return {isValid: false}

    const response = await fetch(`${process.env.BASE_URL}/users/address/zipcode/${zipCode}`, {
        method: "GET",
        headers: {
            Accept: "application/json",
            'Authorization': `Bearer ${token}`,
            "Content-Type": "application/json",
        },
    })

    if (!response.ok) {
        return {isValid: false};
    }

    const responseData: GetAddressFromZipCodeDto = await response.json();
    if (responseData.isValid) {
        return responseData;
    }

    return {isValid: false};
}
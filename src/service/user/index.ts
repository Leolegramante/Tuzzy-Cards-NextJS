'use server'

import {
    CountUsersResponseDto,
    EditUserResponseDto,
    GetAllUsersResponseDto,
    getJWT,
    getSession,
    PaginationDto,
    UpdateLegacyUserResponseDto,
    UserDto,
    UserProfileResponseDto
} from "@/helpers";
import {CreateUserResponseDto} from "@/helpers/";

export const createUser = async (
    user: UserDto
): Promise<CreateUserResponseDto> => {
    const response = await fetch(`${process.env.BASE_URL}/users`, {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
    });

    if (!response.ok) {
        return {isValid: false, message: `${response.status}`};
    }

    const responseData = await response.json();
    if (responseData.isValid) {
        return responseData;
    }

    return {isValid: false, message: `${response.status}`};
};

export const GetAllUsers = async ({limit = 10, offset = 0}: PaginationDto): Promise<GetAllUsersResponseDto> => {
    const token = await getJWT()
    if (!token) return {isValid: false, message: 'Error'}

    const response = await fetch(`${process.env.BASE_URL}/users?limit=${limit}&offset=${offset}`, {
        method: "GET",
        headers: {
            Accept: "application/json",
            'Authorization': `Bearer ${token}`,
            "Content-Type": "application/json",
        },
    });

    if (!response.ok) {
        return {isValid: false, message: `${response.status}`};
    }

    const responseData: GetAllUsersResponseDto = await response.json();
    if (responseData.isValid) {
        return responseData;
    }

    return {isValid: false, message: `${response.status}`};
}

export const EditUser = async (data: UserDto): Promise<EditUserResponseDto> => {
    try {
        const token = await getJWT()
        if (!token) return {isValid: false, message: 'Error'}

        const response = await fetch(`${process.env.BASE_URL}/users`, {
            method: "PATCH",
            headers: {
                Accept: "application/json",
                'Authorization': `Bearer ${token}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });

        if (!response.ok) {
            return {isValid: false, message: `${response.status}`};
        }

        const responseData: EditUserResponseDto = await response.json();
        if (responseData.isValid) {
            return responseData;
        }

        return {isValid: false, message: `${response.status}`};
    } catch {
        return {isValid: false, message: 'Error'}
    }
}

export const CountUsers = async (): Promise<CountUsersResponseDto> => {
    const token = await getJWT()
    if (!token) return {isValid: false, count: 0}

    const response = await fetch(`${process.env.BASE_URL}/users/count`, {
        method: "GET",
        headers: {
            Accept: "application/json",
            'Authorization': `Bearer ${token}`,
            "Content-Type": "application/json",
        },
    });
    if (!response.ok) {
        return {isValid: false, count: 0};
    }
    const responseData: CountUsersResponseDto = await response.json();
    if (responseData.isValid) {
        return responseData;
    }

    return {isValid: false, count: 0};
}

export const UpdateLegacyUser = async (data: UserDto): Promise<UpdateLegacyUserResponseDto> => {
    try {
        const response = await fetch(`${process.env.BASE_URL}/users/legacy-user`, {
            method: "PATCH",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });
        if (!response.ok) {
            return {isValid: false, message: `${response.status}`};
        }

        const responseData: EditUserResponseDto = await response.json();
        if (responseData.isValid) {
            return responseData;
        }

        return {isValid: false, message: `${response.status}`};
    } catch {
        return {isValid: false, message: 'Error'}
    }
}

export const GetUserProfile = async (): Promise<UserProfileResponseDto> => {
    const userSession = await getSession()
    if (!userSession) return {isValid: false, message: 'Error'}

    const token = await getJWT()
    if (!token) return {isValid: false, message: 'Error'}

    const response = await fetch(`${process.env.BASE_URL}/users/profile/${userSession.uuid}`, {
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
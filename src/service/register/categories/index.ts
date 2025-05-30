'use server'

import {
    CategoryDto,
    CreateCategoryResponseDto,
    EditCategoryResponseDto,
    GetAllCategoriesResponseDto,
    getJWT,
    PaginationDto
} from "@/helpers";

export const GetAllCategoriesWithPagination = async ({
                                                         limit = 10,
                                                         offset = 0
                                                     }: PaginationDto): Promise<GetAllCategoriesResponseDto> => {
    const token = await getJWT()
    if (!token) return {isValid: false, message: 'Error'}

    const response = await fetch(`${process.env.BASE_URL}/products-categories/with-pagination?limit=${limit}&offset=${offset}`, {
        method: "GET",
        headers: {
            Accept: "application/json",
            'Authorization': `Bearer ${token}`,
            "Content-Type": "application/json",
        },
    })
    if (!response.ok) {
        throw {isValid: false, message: `${response.status}`};
    }

    const responseData: GetAllCategoriesResponseDto = await response.json();
    if (responseData.isValid) {
        return responseData;
    }

    return {isValid: false, message: `${response.status}`};
}

export const GetAllCategories = async (): Promise<GetAllCategoriesResponseDto> => {
    const token = await getJWT()
    if (!token) return {isValid: false, message: 'Error'}

    const response = await fetch(`${process.env.BASE_URL}/products-categories`, {
        method: "GET",
        headers: {
            Accept: "application/json",
            'Authorization': `Bearer ${token}`,
            "Content-Type": "application/json",
        },
    })
    if (!response.ok) {
        throw {isValid: false, message: `${response.status}`};
    }

    const responseData: GetAllCategoriesResponseDto = await response.json();
    if (responseData.isValid) {
        return responseData;
    }

    return {isValid: false, message: `${response.status}`};
}

export const CreateCategory = async (name: string): Promise<CreateCategoryResponseDto | false> => {
    const token = await getJWT()
    if (!token) return {isValid: false, message: 'Error'}

    const request = {
        name
    }

    const response = await fetch(`${process.env.BASE_URL}/products-categories`, {
        method: "POST",
        headers: {
            Accept: "application/json",
            'Authorization': `Bearer ${token}`,
            "Content-Type": "application/json",
        },
        body: JSON.stringify(request),
    })
    if (!response.ok) {
        throw {isValid: false, message: `${response.status}`};
    }

    const responseData: CreateCategoryResponseDto = await response.json();
    if (responseData.isValid) {
        return responseData;
    }

    return {isValid: false, message: `${response.status}`};
}

export const EditCategory = async (data: CategoryDto): Promise<EditCategoryResponseDto> => {
    try {
        const token = await getJWT()
        if (!token) return {isValid: false, message: 'Error'}

        const response = await fetch(`${process.env.BASE_URL}/products-categories`, {
            method: "PATCH",
            headers: {
                Accept: "application/json",
                'Authorization': `Bearer ${token}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        })
        if (!response.ok) {
            throw {isValid: false, message: `${response.status}`};
        }

        const responseData: EditCategoryResponseDto = await response.json();
        if (responseData.isValid) {
            return responseData;
        }

        return {isValid: false, message: `${response.status}`};
    } catch {
        return {isValid: false, message: 'Error'}
    }
}
'use server'

import {
    CreateSubCategoryResponseDto,
    EditSubCategoryResponseDto,
    GetAllSubCategoriesResponseDto,
    getJWT,
    PaginationDto,
    SubCategoryDto
} from "@/helpers";

export const GetAllSubCategoriesWithPagination = async ({
                                                            limit = 10,
                                                            offset = 0
                                                        }: PaginationDto): Promise<GetAllSubCategoriesResponseDto> => {
    const token = await getJWT()
    if (!token) return {isValid: false, message: 'Error'}

    const response = await fetch(`${process.env.BASE_URL}/products-sub-categories/with-pagination?limit=${limit}&offset=${offset}`, {
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

    const responseData: GetAllSubCategoriesResponseDto = await response.json();
    if (responseData.isValid) {
        return responseData;
    }

    return {isValid: false, message: `${response.status}`};
}

export const GetAllSubCategories = async (): Promise<GetAllSubCategoriesResponseDto> => {
    const token = await getJWT()
    if (!token) return {isValid: false, message: 'Error'}

    const response = await fetch(`${process.env.BASE_URL}/products-sub-categories`, {
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

    const responseData: GetAllSubCategoriesResponseDto = await response.json();
    if (responseData.isValid) {
        return responseData;
    }

    return {isValid: false, message: `${response.status}`};
}

export const CreateSubCategory = async (name: string): Promise<CreateSubCategoryResponseDto | false> => {
    const token = await getJWT()
    if (!token) return {isValid: false, message: 'Error'}

    const request = {
        name
    }

    const response = await fetch(`${process.env.BASE_URL}/products-sub-categories`, {
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

    const responseData: CreateSubCategoryResponseDto = await response.json();
    if (responseData.isValid) {
        return responseData;
    }

    return {isValid: false, message: `${response.status}`};
}

export const EditSubCategory = async (data: SubCategoryDto): Promise<EditSubCategoryResponseDto> => {
    const token = await getJWT()
    if (!token) return {isValid: false, message: 'Error'}

    const response = await fetch(`${process.env.BASE_URL}/products-sub-categories`, {
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

    const responseData = await response.json();
    if (responseData.isValid) {
        return responseData;
    }

    return {isValid: false, message: `${response.status}`};
}
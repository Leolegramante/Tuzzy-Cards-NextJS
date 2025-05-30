'use server'

import {CategoryDto, PaginationDto} from "@/helpers";
import {GetAllCategoriesWithPagination} from "@/service";

export type GetCategoriesResponse = {
    categories: CategoryDto[],
    total: number,
    totalPages: number,
}

export const getCategories = async ({
                                        limit = 10,
                                        page = 1
                                    }: PaginationDto): Promise<GetCategoriesResponse | false> => {
    const offset = (page - 1) * 10
    const response = await GetAllCategoriesWithPagination({limit, offset})
    if (response.isValid && typeof response.category !== 'undefined' && typeof response.total !== 'undefined') {
        const totalPages = Math.ceil(response.total / limit)
        return {categories: response.category, total: response.total, totalPages}
    }

    return false
}
import {PaginationDto, SubCategoryDto} from "@/helpers";
import {GetAllSubCategoriesWithPagination} from "@/service";

export type GetSubCategoriesResponse = {
    subCategories: SubCategoryDto[],
    total: number,
    totalPages: number,
}

export const getSubCategories = async ({
                                           limit = 10,
                                           page = 1
                                       }: PaginationDto): Promise<GetSubCategoriesResponse | false> => {
    const offset = (page - 1) * 10
    const response = await GetAllSubCategoriesWithPagination({limit, offset})
    if (response.isValid && typeof response.subCategory !== 'undefined' && typeof response.total !== 'undefined') {
        const totalPages = Math.ceil(response.total / limit)
        return {subCategories: response.subCategory, total: response.total, totalPages}
    }

    return false
}
import {CategoryDto, PaginationDto, ProductDto, SubCategoryDto} from "@/helpers";
import {GetAllCategories, GetAllProducts, GetAllSubCategories} from "@/service";

export type GetProductsResponse = {
    products: ProductDto[],
    total: number,
    totalPages: number,
}

export const getProducts = async ({
                                      page = 1,
                                      limit = 10,
                                      sortBy = 'createdAt',
                                      order = 'desc'
                                  }: PaginationDto): Promise<GetProductsResponse | false> => {
    const offset = (page - 1) * 10
    const response = await GetAllProducts({limit, offset, sortBy, order})
    if (response.isValid && typeof response.products !== 'undefined' && typeof response.total !== 'undefined') {
        const totalPages = Math.ceil(response.total / limit)
        return {products: response.products, total: response.total, totalPages}
    }

    return false
}

export const getCategories = async (): Promise<CategoryDto[] | false> => {
    const response = await GetAllCategories()
    if (response.isValid && typeof response.category !== 'undefined') {
        return response.category
    }

    return false
}

export const getSubCategories = async (): Promise<SubCategoryDto[] | false> => {
    const response = await GetAllSubCategories()
    if (response.isValid && typeof response.subCategory !== 'undefined') {
        return response.subCategory
    }

    return false
}
'use server'

import {PaginationDto, ProductDto} from "@/helpers";
import {GetAllProducts} from "@/service";

export type GetProductsResponse = {
    products: ProductDto[],
    total: number,
    totalPages: number,
}

export const GetProducts = async ({
                                      page = 1,
                                      limit = 12,
                                      sortBy,
                                      order,
                                      categoryIds = '',
                                      subCategoryIds = '',
                                      inStock = undefined
                                  }: PaginationDto): Promise<GetProductsResponse | false> => {
    const offset = (page - 1) * 12
    const response = await GetAllProducts({limit, offset, sortBy, order, categoryIds, subCategoryIds, inStock})
    if (response.isValid && typeof response.products !== 'undefined' && typeof response.total !== 'undefined') {
        return {products: response.products, total: response.total, totalPages: Math.ceil(response.total / limit)}
    }
    return false
}
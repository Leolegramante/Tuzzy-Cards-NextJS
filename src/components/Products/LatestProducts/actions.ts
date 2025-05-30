'use server'

import {GetAllProducts} from "@/service";

export const getLatestProducts = async () => {
    const response = await GetAllProducts({limit: 10, sortBy: 'createdAt', order: 'desc', offset: 0})
    if (response.isValid && typeof response.products !== 'undefined') {
        return response.products
    } else {
        return false
    }
}
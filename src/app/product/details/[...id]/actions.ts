'use server'

import {GetProductsBySku} from "@/service";

export const GetProduct = async (sku: string) => {
    return await GetProductsBySku(sku)
}
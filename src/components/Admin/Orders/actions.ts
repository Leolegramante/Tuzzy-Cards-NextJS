'use server'

import {GetAllOrders} from "@/service";

export async function getOrders() {
    return await GetAllOrders()
}
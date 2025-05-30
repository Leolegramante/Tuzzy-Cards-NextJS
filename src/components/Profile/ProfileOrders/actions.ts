'use server'

import {GetUserOrders} from "@/service/orders";

export async function getUserOrders() {
    return await GetUserOrders();
}
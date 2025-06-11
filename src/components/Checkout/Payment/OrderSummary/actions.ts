'use server'

import {CreateOrderDto} from "@/helpers";
import {CreateOrder} from "@/service";

export const createOrder = async (data: CreateOrderDto) => {
    return await CreateOrder(data)
}
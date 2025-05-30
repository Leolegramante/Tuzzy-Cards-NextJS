'use server'

import {CreateOrderDto, getSession, ValidateCartDto} from "@/helpers";
import {CreateOrder, ValidateCart} from "@/service";

export async function validateCart(data: ValidateCartDto) {
    return await ValidateCart(data)
}

export async function createOrder(data: CreateOrderDto) {
    return await CreateOrder(data);
}

export async function getUserSession() {
    return await getSession()
}
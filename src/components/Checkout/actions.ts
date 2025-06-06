'use server'

import {CalculateShipmentDto, CreateOrderDto, getSession, ValidateCartDto} from "@/helpers";
import {CalculateShipment, CreateOrder, ValidateCart} from "@/service";

export async function validateCart(data: ValidateCartDto) {
    return await ValidateCart(data)
}

export async function createOrder(data: CreateOrderDto) {
    return await CreateOrder(data);
}

export async function getUserSession() {
    return await getSession()
}

export async function calculateShipment(data: CalculateShipmentDto) {
    return await CalculateShipment(data)
}
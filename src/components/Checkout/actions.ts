'use server'

import {CalculateShipmentDto, getSession, ValidateCartDto} from "@/helpers";
import {CalculateShipment, ValidateCart} from "@/service";

export async function validateCart(data: ValidateCartDto) {
    return await ValidateCart(data)
}

export async function getUserSession() {
    return await getSession()
}

export async function calculateShipment(data: CalculateShipmentDto) {
    return await CalculateShipment(data)
}
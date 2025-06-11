'use server'

import {CalculateShipmentDto} from "@/helpers";
import {CalculateShipment, GetAddressFromZipCode} from "@/service";

export const getAddressFromZipCode = async (uuid: string) => {
    return await GetAddressFromZipCode(uuid);
}

export async function calculateShipment(data: CalculateShipmentDto) {
    return await CalculateShipment(data)
}
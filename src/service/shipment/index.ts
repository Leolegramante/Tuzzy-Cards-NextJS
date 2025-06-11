'use server'

import {CalculateShipmentDto, CalculateShipmentResponseDto, getJWT, getSession} from "@/helpers";

export const CalculateShipment = async (data: CalculateShipmentDto): Promise<CalculateShipmentResponseDto> => {
    const session = await getSession()
    if (!session) return {isValid: false, message: 'Error', boxId: 0}

    const token = await getJWT()
    if (!token) return {isValid: false, message: 'Error', boxId: 0}

    const response = await fetch(`${process.env.BASE_URL}/shipment/calculate`, {
        method: "POST",
        headers: {
            Accept: "application/json",
            'Authorization': `Bearer ${token}`,
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });

    if (!response.ok) return {isValid: false, message: 'Error', boxId: 0}

    const responseData: CalculateShipmentResponseDto = await response.json();
    if (responseData.isValid) return responseData;
    
    return {isValid: false, message: `${response.status}`, boxId: 0};
}

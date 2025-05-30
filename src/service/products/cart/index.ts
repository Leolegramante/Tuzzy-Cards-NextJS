'use server'

import {getJWT, ValidateCartDto, ValidateCartResponseDto} from "@/helpers";

export const ValidateCart = async (data: ValidateCartDto): Promise<ValidateCartResponseDto> => {
    try {
        const token = await getJWT()
        if (!token) return {stockStatus: [], isValid: false, message: 'Error'}
        const res = await fetch(`${process.env.BASE_URL}/cart/validate`, {
            method: "POST",
            headers: {
                Accept: "application/json",
                'Authorization': `Bearer ${token}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });

        if (!res.ok) {
            return {isValid: false, message: `${res.status}`, stockStatus: []};
        }

        return await res.json();

    } catch {
        return {isValid: false, message: `Error`, stockStatus: []}
    }
};
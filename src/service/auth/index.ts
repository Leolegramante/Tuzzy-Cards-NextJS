"use server";

import {SignInResponseDto, VerifyEmailResponseDto} from "@/helpers";

export const signIn = async (
    {email, password}: {
        email: string,
        password: string
    }
): Promise<SignInResponseDto> => {
    try {
        const data = {
            email,
            password,
        };

        const response = await fetch(`${process.env.BASE_URL}/auth`, {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });

        if (!response.ok) {
            throw {isValid: false, message: `${response.status}`};
        }

        if (response.status === 201) {
            return await response.json();
        }

        return {isValid: false, message: `${response.status}`};
    } catch {
        return {isValid: false, message: 'Error'}
    }
};

export const VerifyEmail = async (email: string): Promise<VerifyEmailResponseDto> => {
    try {
        const requestEmail = email.replace(/@/g, "%40")

        const response = await fetch(`${process.env.BASE_URL}/auth/${requestEmail}`, {
            method: "GET",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
        });

        if (!response.ok) {
            throw {isValid: false, message: `${response.status}`};
        }

        if (response.status === 200) {
            return await response.json();
        }

        return {isValid: false, message: `${response.status}`};
    } catch {
        return {isValid: false, message: 'Error'}
    }
}
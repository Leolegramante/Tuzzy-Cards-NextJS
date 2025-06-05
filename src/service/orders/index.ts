'use server'

import {
    CreateOrderDto,
    CreateOrderResponseDto,
    GetAllOrdersResponseDto,
    getJWT,
    getSession,
    GetUserOrdersResponseDto
} from "@/helpers";

export async function GetAllOrders(): Promise<GetAllOrdersResponseDto> {
    const session = await getSession()
    if (!session) return {orders: [], isValid: false, message: 'Error'}

    const token = await getJWT()
    if (!token) return {orders: [], isValid: false, message: 'Error'}

    const response = await fetch(`${process.env.BASE_URL}/orders`, {
        method: "GET",
        headers: {
            Accept: "application/json",
            'Authorization': `Bearer ${token}`,
            "Content-Type": "application/json",
        },
    });

    if (!response.ok) {
        return {isValid: false, message: `${response.status}`, orders: []};
    }

    const responseData: GetAllOrdersResponseDto = await response.json();
    if (responseData.isValid) {
        return responseData;
    }

    return {isValid: false, message: `${response.status}`, orders: []};
}

export async function GetUserOrders(): Promise<GetUserOrdersResponseDto> {
    const session = await getSession()
    if (!session) return {orders: [], isValid: false, message: 'Error'}

    const token = await getJWT()
    if (!token) return {orders: [], isValid: false, message: 'Error'}

    const response = await fetch(`${process.env.BASE_URL}/orders/user/${session.uuid}`, {
        method: "GET",
        headers: {
            Accept: "application/json",
            'Authorization': `Bearer ${token}`,
            "Content-Type": "application/json",
        },
    });

    if (!response.ok) {
        return {isValid: false, message: `${response.status}`, orders: []};
    }

    const responseData: GetUserOrdersResponseDto = await response.json();
    if (responseData.isValid) {
        return responseData;
    }

    return {isValid: false, message: `${response.status}`, orders: []};
}

export async function EditOrder(id: string, status: string): Promise<{ isValid: boolean, message: string }> {
    const session = await getSession()
    if (!session) return {isValid: false, message: 'Error'}

    const token = await getJWT()
    if (!token) return {isValid: false, message: 'Error'}

    const response = await fetch(`${process.env.BASE_URL}/orders/${id}`, {
        method: "PATCH",
        headers: {
            Accept: "application/json",
            'Authorization': `Bearer ${token}`,
            "Content-Type": "application/json",
        },
        body: JSON.stringify({status}),
    });

    if (!response.ok) {
        return {isValid: false, message: `${response.status}`};
    }

    const responseData = await response.json();
    if (responseData.isValid) {
        return responseData;
    }

    return {isValid: false, message: `${response.status}`};
}

export async function CreateOrder(createOrder: CreateOrderDto): Promise<CreateOrderResponseDto> {
    const session = await getSession()
    if (!session) return {isValid: false, message: 'Error'}

    const token = await getJWT()
    if (!token) return {isValid: false, message: 'Error'}

    createOrder.userUuid = session.uuid
    const response = await fetch(`${process.env.BASE_URL}/orders`, {
        method: "POST",
        headers: {
            Accept: "application/json",
            'Authorization': `Bearer ${token}`,
            "Content-Type": "application/json",
        },
        body: JSON.stringify(createOrder),
    });

    if (!response.ok) {
        return {isValid: false, message: `${response.status}`};
    }

    const responseData: CreateOrderResponseDto = await response.json();
    if (responseData.isValid) {
        return responseData;
    }

    return {isValid: false, message: `${response.status}`};

}
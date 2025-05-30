import {OrderDto} from "@/helpers";

export type CreateOrderDto = {
    userUuid?: string;
    products: { productId: number; quantity: number, price: number }[];
    total: number;
}

export type CreateOrderResponseDto = {
    isValid: boolean;
    message: string;
    order?: OrderDto
}
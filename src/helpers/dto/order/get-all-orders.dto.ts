import {OrderDto} from "@/helpers/dto/order/order.dto";

export type GetAllOrdersResponseDto = {
    isValid: boolean;
    message: string;
    orders: OrderDto[];
}
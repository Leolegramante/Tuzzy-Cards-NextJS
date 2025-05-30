import {OrderDto} from "@/helpers/dto/order/order.dto";

export type GetUserOrdersResponseDto = {
    isValid: boolean;
    message: string;
    orders: OrderDto[];
}

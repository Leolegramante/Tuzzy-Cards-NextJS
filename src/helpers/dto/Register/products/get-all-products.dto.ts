import {ProductDto} from "@/helpers";

export type GetAllProductsResponseDto = {
    isValid: boolean,
    message: string,
    products?: ProductDto[]
    total?: number
}
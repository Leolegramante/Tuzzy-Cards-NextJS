import {ProductDto} from "@/helpers";

export type GetProductByIdResponseDto = {
    isValid: boolean,
    message: string,
    product?: ProductDto
}
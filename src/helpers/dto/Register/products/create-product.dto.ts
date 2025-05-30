import {ProductDto} from "@/helpers";

export type CreateProductResponseDto = {
    isValid: boolean,
    message: string,
    product?: ProductDto
}

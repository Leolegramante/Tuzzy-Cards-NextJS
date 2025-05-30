import {ProductDto} from "@/helpers";

export type EditProductResponseDto = {
    isValid: boolean,
    message: string,
    product?: ProductDto
}
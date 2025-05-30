import {CategoryDto} from "@/helpers";

export type CreateCategoryResponseDto = {
    isValid: boolean,
    message: string,
    category?: CategoryDto
}

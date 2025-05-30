import {CategoryDto} from "@/helpers";

export type EditCategoryResponseDto = {
    isValid: boolean,
    message: string,
    category?: CategoryDto
}

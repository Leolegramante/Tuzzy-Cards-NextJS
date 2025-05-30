import {CategoryDto} from "@/helpers";

export type GetAllCategoriesResponseDto = {
    isValid: boolean,
    message: string,
    category?: CategoryDto[]
    total?: number
}

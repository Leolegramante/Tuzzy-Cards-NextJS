import {SubCategoryDto} from "@/helpers";

export type CreateSubCategoryResponseDto = {
    isValid: boolean,
    message: string,
    subCategory?: SubCategoryDto
}

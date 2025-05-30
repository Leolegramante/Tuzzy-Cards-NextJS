import {SubCategoryDto} from "@/helpers";

export type EditSubCategoryResponseDto = {
    isValid: boolean,
    message: string,
    subCategory?: SubCategoryDto
}

import {SubCategoryDto} from "@/helpers";

export type GetAllSubCategoriesResponseDto = {
    isValid: boolean,
    message: string,
    subCategory?: SubCategoryDto[]
    total?: number
}

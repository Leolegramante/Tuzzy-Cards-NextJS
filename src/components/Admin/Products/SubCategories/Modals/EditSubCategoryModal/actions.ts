"use server";

import {SubCategoryDto} from "@/helpers";
import {getZodErrors} from "@/helpers/zod";
import {EditSubCategory} from "@/service";
import {z} from "zod";

export type SubCategoryError = Record<
    "name" | 'id',
    string | undefined
> | null;

export type EditSubCategoryState = {
    isValid: boolean | undefined;
    errors: SubCategoryError;
    id: number;
    name: string;
};

const subCategorySchema = z.object({
    name: z.string(),
})

const validateEditSubCategoryForm = (formData: FormData): EditSubCategoryState => {
    const parsedData = Object.fromEntries(formData);
    const validation = subCategorySchema.safeParse(parsedData);
    if (!validation.success) {
        return {
            isValid: false,
            errors: getZodErrors(validation.error),
            ...parsedData,
        } as EditSubCategoryState;
    }

    return {isValid: true, errors: null, ...parsedData} as EditSubCategoryState;
}

const mapFormDataToSubCategoryDto = (FormData: FormData): SubCategoryDto => ({
    id: Number(FormData.get("id")),
    name: FormData.get("name") as string,
})

const editSubCategoryError = (message: string): SubCategoryError => ({
    name: message,
    id: undefined,
})

const processEditSubCategory = async (subCategoryDto: SubCategoryDto): Promise<{
    isValid: boolean;
    errors: SubCategoryError
}> => {
    const {isValid, subCategory} = await EditSubCategory(subCategoryDto)
    if (!isValid || !subCategory?.id) {
        return {isValid: false, errors: editSubCategoryError("Erro ao editar sub categoria")}
    }
    return {isValid: true, errors: null}
}

export const handleEditSubCategoryForm = async (_prestate: EditSubCategoryState, formData: FormData): Promise<EditSubCategoryState> => {
    const validation = validateEditSubCategoryForm(formData)

    if (!validation.isValid) return validation

    const subCategoryDto = mapFormDataToSubCategoryDto(formData)

    const result = await processEditSubCategory(subCategoryDto)
    return {...validation, ...result}
}
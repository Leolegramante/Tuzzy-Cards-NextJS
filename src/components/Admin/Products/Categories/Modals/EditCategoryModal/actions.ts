"use server";

import {CategoryDto} from "@/helpers";
import {getZodErrors} from "@/helpers/zod";
import {EditCategory} from "@/service";
import {z} from "zod";

export type CategoryError = Record<
    "name" | 'id',
    string | undefined
> | null;

export type EditCategoryState = {
    isValid: boolean | undefined;
    errors: CategoryError;
    id: number;
    name: string;
};

const categorySchema = z.object({
    name: z.string(),
})

const validateEditCategoryForm = (formData: FormData): EditCategoryState => {
    const parsedData = Object.fromEntries(formData);
    const validation = categorySchema.safeParse(parsedData);
    if (!validation.success) {
        return {
            isValid: false,
            errors: getZodErrors(validation.error),
            ...parsedData,
        } as EditCategoryState;
    }

    return {isValid: true, errors: null, ...parsedData} as EditCategoryState;
}

const mapFormDataToCategoryDto = (formData: FormData): CategoryDto => ({
    id: Number(formData.get("id")),
    name: formData.get("name") as string,
});

const editCategoryError = (message: string): CategoryError => ({
    name: message,
    id: undefined,
});

const processEditCategory = async (categoryDto: CategoryDto): Promise<{ isValid: boolean; errors: CategoryError }> => {
    const {isValid, category} = await EditCategory(categoryDto);
    if (!isValid || !category?.id) {
        return {isValid: false, errors: editCategoryError("Erro ao editar categoria")};
    }
    return {isValid: true, errors: null};
}

export const handleCategoryForm = async (_prestate: EditCategoryState, formData: FormData): Promise<EditCategoryState> => {
    const validation = validateEditCategoryForm(formData);

    if (!validation.isValid) return validation;

    const categoryDto = mapFormDataToCategoryDto(formData);

    const result = await processEditCategory(categoryDto);
    return {...validation, ...result};
}
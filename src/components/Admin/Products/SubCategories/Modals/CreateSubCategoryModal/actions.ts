"use server";

import {SubCategoryDto} from "@/helpers";
import {z} from "zod";
import {getZodErrors} from "@/helpers/zod";
import {CreateSubCategory} from "@/service";

export type CreateSubCategoryState = {
    isValid: boolean | undefined;
    errors: {
        name: string | undefined;
    } | null;
    data?: {
        subCategory: SubCategoryDto;
    };
};

const validateSubCategoryForm = (formData: FormData) => {
    const subCategorySchema = z.object({
        name: z.string(),
    })
    try {
        subCategorySchema.parse(Object.fromEntries(formData))
        return {isValid: true, errors: {}};
    } catch (error: unknown) {
        const zodErrors = getZodErrors(error);
        return {isValid: false, errors: zodErrors || {}};
    }
}

export const handleSubCategoryForm = async (formData: FormData): Promise<CreateSubCategoryState> => {
    const name = formData.get("name") as string;

    const validation = validateSubCategoryForm(formData);
    if (!validation.isValid) {
        return {
            isValid: true,
            errors: {
                name: "Nome é obrigatório",
            },
        };
    }

    try {
        const response = await CreateSubCategory(name)
        if (response && response.subCategory) {
            return {
                isValid: true,
                errors: null,
                data: {
                    subCategory: response.subCategory
                }
            };
        } else {
            return {
                isValid: false,
                errors: {
                    name: "Nome é obrigatório",
                },
            };
        }
    } catch {
        return {
            isValid: false,
            errors: {
                name: "Nome é obrigatório",
            },
        };
    }
}
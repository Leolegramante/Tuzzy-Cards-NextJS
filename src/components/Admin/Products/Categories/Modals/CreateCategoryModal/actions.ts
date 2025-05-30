"use server";

import {CategoryDto} from "@/helpers";
import {z} from "zod";
import {getZodErrors} from "@/helpers/zod";
import {CreateCategory} from "@/service";

export type CreateCategoryState = {
    isValid: boolean | undefined;
    errors: {
        name: string | undefined;
    } | null;
    data?: {
        category: CategoryDto;
    };
};

const validateCategoryForm = (formData: FormData) => {
    const categorySchema = z.object({
        name: z.string(),
    })
    try {
        categorySchema.parse(Object.fromEntries(formData))
        return {isValid: true, errors: {}};
    } catch (error: unknown) {
        const zodErrors = getZodErrors(error);
        return {isValid: false, errors: zodErrors || {}};
    }
}

export const handleCategoryForm = async (formData: FormData): Promise<CreateCategoryState> => {
    const name = formData.get("name") as string;

    const validation = validateCategoryForm(formData);
    if (!validation.isValid) {
        return {
            isValid: true,
            errors: {
                name: "Nome é obrigatório",
            },
        };
    }

    try {
        const response = await CreateCategory(name)
        if (response && response.category) {
            return {
                isValid: true,
                errors: null,
                data: {
                    category: response.category
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
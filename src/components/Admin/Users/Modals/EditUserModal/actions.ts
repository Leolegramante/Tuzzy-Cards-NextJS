"use server"

import {UserDto} from "@/helpers";
import {getZodErrors} from "@/helpers/zod";
import {EditUser} from "@/service";
import {z} from "zod";

export type EditUserState = {
    isValid: boolean | undefined;
    errors: {
        firstName: string | undefined;
        lastName: string | undefined;
        email: string | undefined;
        role: string | undefined;
    } | null;
    user?: UserDto;
};

const validateEditUserForm = (formData: FormData) => {
    const categorySchema = z.object({
        firstName: z.string(),
        lastName: z.string(),
        email: z.string().email(),
        role: z.string(),
    })
    try {
        categorySchema.parse(Object.fromEntries(formData))
        return {isValid: true, errors: {}};
    } catch (error: unknown) {
        const zodErrors = getZodErrors(error);
        return {isValid: false, errors: zodErrors || {}};
    }
}

export const handleEditUserForm = async (formData: FormData): Promise<EditUserState> => {
    const id = formData.get("id") as string;
    const uuid = formData.get("uuid") as string;
    const firstName = formData.get("firstName") as string;
    const lastName = formData.get("lastName") as string;
    const role = formData.get("role") as string;
    const active = formData.get("active") === "true";
    const email = formData.get("email") as string;
    const username = formData.get("username") as string;


    const validation = validateEditUserForm(formData);
    if (!validation.isValid) {
        return {
            isValid: true,
            errors: {
                firstName: "Nome é obrigatório",
                lastName: 'Sobrenome é obrigatório',
                role: 'Role é obrigatório',
                email: 'Email é obrigatório'
            },
        };
    }

    const response = await EditUser({id, uuid, firstName, lastName, role, active, email, username})
    if (response.isValid) {
        return {isValid: true, errors: null}
    }

    return {isValid: false, errors: null}
}
import {UserDto} from "@/helpers";
import {getZodErrors} from "@/helpers/zod";
import {VerifyEmail} from "@/service";
import {z} from "zod";

export type VerifyEmailError = {
    email?: string | undefined;
};

export type VerifyEmailState = {
    isValid?: boolean;
    errors: VerifyEmailError;
    user?: UserDto | null;
};

const validateVerifyEmailForm = (formData: FormData) => {
    const userSchema = z
        .object({
            email: z.string().email("Email invalido"),
        })

    try {
        userSchema.parse(Object.fromEntries(formData));
        return {isValid: true, errors: {}};
    } catch (error: unknown) {
        const zodErrors = getZodErrors(error);

        return {isValid: false, errors: zodErrors || {}};
    }
};

export const handleVerifyEmailForm = async (formData: FormData): Promise<VerifyEmailState> => {
    const email = String(formData.get("email"))

    const validation = validateVerifyEmailForm(formData);
    if (!validation.isValid) {
        return {isValid: false, errors: {email: 'Email inválido'}};
    }

    const {isValid, user} = await VerifyEmail(email)

    if (!isValid) return {isValid: false, errors: {email: 'Email já utilizado'}};

    if (isValid && user !== null && user !== undefined) {
        return {
            isValid: true,
            errors: {},
            user: user
        }
    }

    if (isValid && user === null) {
        return {isValid: true, errors: {}, user: {email: email, firstName: '', lastName: '', legacyUser: false}}
    } else {
        return {isValid: false, errors: {email: 'Email já utilizado'}}
    }
}
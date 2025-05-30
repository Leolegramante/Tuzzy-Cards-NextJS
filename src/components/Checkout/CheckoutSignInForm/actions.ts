"use server"

import {createSession} from "@/helpers";
import {getZodErrors} from "@/helpers/zod";
import {signIn} from "@/service";
import {redirect, RedirectType} from "next/navigation";
import {z} from "zod";

export type SignInError = Record<
    "email" | 'password',
    string | undefined
> | null;

export type SignInState = {
    isValid: boolean | undefined;
    errors: SignInError;
    email: string;
    password: string;
};

const userSchema = z.object({
    email: z.string().email("Email invalid"),
    password: z.string().min(8, "Sua senha deve ter no mínimo 8 caracteres"),
});

const validateSignUpForm = (formData: FormData) => {
    const parsedData = Object.fromEntries(formData);
    const validation = userSchema.safeParse(parsedData);
    if (!validation.success) return {
        isValid: false,
        errors: getZodErrors(validation.error),
        ...parsedData
    } as SignInState;
    return {isValid: true, errors: null, ...parsedData} as SignInState;
};

const mapFormDataToUserDto = (formData: FormData): { email: string; password: string } => ({
    email: formData.get('email') as string,
    password: formData.get('password') as string,
})

const signInError = (message: string): SignInError => ({
    email: message,
    password: undefined
})

const processSignIn = async (data: { email: string; password: string; }): Promise<{
    isValid: boolean; errors: SignInError; access_token: string | null;
}> => {
    const {isValid, access_token} = await signIn(data)
    if (!isValid || !access_token) {
        return {isValid: false, errors: signInError('Email ou senha inválidos'), access_token: null}
    }
    return {isValid: true, errors: null, access_token}
}

export const handleSignInForm = async (_prevState: SignInState, formData: FormData) => {
    const validation = validateSignUpForm(formData);

    if (!validation.isValid) return validation;

    const userDto = mapFormDataToUserDto(formData);
    const result = await processSignIn(userDto);
    if (!result.isValid || !result.access_token) return result;

    await createSession(result.access_token)

    redirect("/checkout", RedirectType.replace)
};
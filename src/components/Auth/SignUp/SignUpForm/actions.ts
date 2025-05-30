"use server";

import {createSession, isValidCPF, isValidPhone, UserDto} from "@/helpers";
import {getZodErrors} from "@/helpers/zod";
import {createUser, UpdateLegacyUser} from "@/service";
import {revalidatePath} from "next/cache";
import {redirect} from "next/navigation";
import {z} from "zod";

export type SignUpError = {
    firstName?: string | undefined;
    lastName?: string | undefined;
    email?: string | undefined;
    username?: string | undefined;
    password?: string | undefined;
    passwordConfirmation?: string | undefined;
    cpf?: string | undefined;
    phone?: string | undefined;
} | null;

export type SignUpState = {
    isValid?: boolean;
    errors: SignUpError;
    firstName: string;
    lastName: string;
    username: string;
    email: string;
    password: string;
    passwordConfirmation: string;
    cpf: string;
    phone: string;
};

// Schema de validação do formulário
const signUpSchema = z
    .object({
        firstName: z.string().min(3, "Nome deve conter ao menos 3 caracteres"),
        lastName: z.string().min(3, "Sobrenome deve conter ao menos 3 caracteres"),
        email: z.string().email("Email inválido"),
        password: z.string().min(8, "Sua senha deve ter no mínimo 8 caracteres"),
        passwordConfirmation: z.string(),
        username: z.string().min(3, "Username deve conter ao menos 3 caracteres"),
        cpf: z.string()
            .regex(/^\d{3}\.\d{3}\.\d{3}-\d{2}$/, 'Formato de CPF inválido')
            .refine((cpf) => isValidCPF(cpf), {
                message: 'CPF inválido',
            }),
        phone: z.string()
            .regex(/^\(\d{2}\) \d{4,5}-\d{4}$/, 'Formato inválido de telefone')
            .refine((phone) => isValidPhone(phone), {
                message: 'Telefone inválido',
            }),
    })
    .refine(
        (data) => data.password === data.passwordConfirmation,
        {message: "Ops! As senhas digitadas não são iguais", path: ["passwordConfirmation"]}
    );

// Valida os dados do formulário e retorna seu estado
const validateSignUpForm = (formData: FormData): SignUpState => {
    const parsedData = Object.fromEntries(formData);
    const validation = signUpSchema.safeParse(parsedData);

    if (validation.success) {
        return {isValid: true, errors: null, ...parsedData} as SignUpState;
    }

    return {isValid: false, errors: getZodErrors(validation.error), ...parsedData} as SignUpState;
};

// Mapear FormData para um usuário
const mapFormDataToUserDto = (formData: FormData, uuid: string): UserDto => ({
    uuid,
    email: String(formData.get("email")),
    firstName: String(formData.get("firstName")),
    lastName: String(formData.get("lastName")),
    username: String(formData.get("username")),
    password: String(formData.get("password")),
    cpf: String(formData.get("cpf")),
    phone: String(formData.get("phone")),
});

// Criar objeto de erro comum
const createSignUpError = (message: string): SignUpError => ({
    email: message,
    username: message,
    password: undefined,
    passwordConfirmation: undefined,
    firstName: undefined,
    lastName: undefined,
    cpf: undefined,
    phone: undefined,
});

// Lida com a lógica de criação ou atualização do usuário
const processUserCreationOrUpdate = async (
    userDto: UserDto,
    isLegacyUser: boolean
): Promise<{ isValid: boolean; errors: SignUpError; session?: string }> => {
    const serviceFunction = isLegacyUser ? UpdateLegacyUser : createUser;
    const {isValid, access_token} = await serviceFunction(userDto);

    if (!isValid) {
        return {
            isValid: false,
            errors: createSignUpError("Email ou Username já utilizado"),
        };
    }

    const session = access_token ? access_token : null;

    if (!session) {
        return {
            isValid: false,
            errors: createSignUpError("Erro ao processar o usuário"),
        };
    }

    return {isValid: true, errors: null, session};
};

// Finalizar sessão para usuários criados ou atualizados
const finalizeSession = async (session: string): Promise<never> => {
    await createSession(session);
    revalidatePath("/");
    redirect("/");
};

// Lida com o formulário de registro
export const handleSignUpForm = async (
    _preState: SignUpState,
    formData: FormData,
    user: UserDto
): Promise<SignUpState> => {
    const validation = validateSignUpForm(formData);

    if (!validation.isValid) {
        return validation;
    }

    const userDto = mapFormDataToUserDto(formData, user.uuid ?? "");
    const isLegacyUser = user.legacyUser ?? false;

    const result = await processUserCreationOrUpdate(userDto, isLegacyUser);

    if (!result.isValid || !result.session) {
        return {...validation, isValid: false, errors: result.errors};
    }

    return await finalizeSession(result.session);
};
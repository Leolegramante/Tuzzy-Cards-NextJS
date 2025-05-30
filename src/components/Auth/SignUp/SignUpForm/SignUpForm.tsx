"use client";

import {CPFInput, PasswordInput, PhoneInput, SubmitButton, TextInput} from "@/components";
import {UserDto} from "@/helpers";
import {useActionState, useRef} from "react";
import {handleSignUpForm, type SignUpState} from "./actions";

type SignUpFormProps = {
    user: UserDto;
};

export function SignUpForm({user}: SignUpFormProps) {
    // Estado inicial definido com base no estado padrão de SignUpState
    const initialState: SignUpState = {
        isValid: undefined,
        errors: null,
        firstName: user.firstName,
        lastName: user.lastName,
        username: "",
        email: user.email,
        password: "",
        passwordConfirmation: "",
        cpf: "",
        phone: "",
    };

    // Ref para acessar o formulário com segurança
    const formRef = useRef<HTMLFormElement>(null);

    // Função que cria o handler de ação
    async function actionHandler(state: SignUpState): Promise<SignUpState> {
        const formData = new FormData(formRef.current as HTMLFormElement);
        return handleSignUpForm(state, formData, user);
    }

    // Hook de estado da ação
    const [state, formAction, isPending] = useActionState<SignUpState>(actionHandler, initialState);

    return (
        <form ref={formRef} action={formAction}>
            <div className="flex flex-col sm:flex-row gap-2 mb-0">
                <TextInput
                    label="Nome"
                    id="firstName"
                    name="firstName"
                    error={state.errors?.firstName}
                    defaultValue={state.firstName}
                    className="w-full"
                />
                <TextInput
                    label="Sobrenome"
                    id="lastName"
                    name="lastName"
                    error={state.errors?.lastName}
                    defaultValue={state.lastName}
                    className="w-full"
                />
            </div>

            <div className="flex flex-col sm:flex-row gap-2 mb-0">
                <PhoneInput
                    label="Telefone"
                    id="phone"
                    name="phone"
                    error={state.errors?.phone}
                    defaultValue={state.phone}
                    className="w-full"
                />
                <CPFInput
                    label="CPF"
                    id="cpf"
                    name="cpf"
                    error={state.errors?.cpf}
                    defaultValue={state.cpf}
                    className="w-full"
                />
            </div>

            <TextInput
                name="username"
                id="username"
                label="Nome de usuário"
                inputMode="text"
                error={state.errors?.username}
                defaultValue={state.username}
            />
            <TextInput
                name="email"
                label="E-mail"
                inputMode="email"
                error={state.errors?.email}
                defaultValue={state.email}
            />
            <div className="flex flex-col sm:flex-row gap-2 mb-0">
                <PasswordInput
                    label="Senha"
                    id="password"
                    name="password"
                    error={state.errors?.password}
                    defaultValue={state.password}
                    className='max-w-[188px]'
                />
                <PasswordInput
                    label="Confirmação de Senha"
                    id="passwordConfirmation"
                    name="passwordConfirmation"
                    error={state.errors?.passwordConfirmation}
                    defaultValue={state.passwordConfirmation}
                    className='max-w-[188px]'
                />
            </div>
            <SubmitButton label="Cadastrar" isLoading={isPending}/>
        </form>
    );
}
'use client'

import {PasswordInput, SubmitButton, TextInput} from "@/components";
import {useActionState, useRef} from "react";
import {handleSignInForm, type SignInState} from "./actions";

const initialState: SignInState = {
    isValid: undefined,
    errors: null,
    email: "",
    password: "",
};

export default function CheckoutSignInForm() {
    const formRef = useRef<HTMLFormElement>(null);
    const [state, formAction, isPending] = useActionState<SignInState>(async (currentState: SignInState) => {
        const formData = new FormData(formRef.current as HTMLFormElement)
        const result = await handleSignInForm(currentState, formData);

        if (!result.isValid) {
            return {
                isValid: result.isValid,
                errors: result.errors,
                email: currentState.email,
                password: currentState.password,
            };
        }

        return {
            isValid: result.isValid,
            errors: null,
            email: currentState.email,
            password: currentState.password,
        };
    }, initialState);

    return (
        <form action={formAction} ref={formRef}>
            <TextInput
                name="email"
                label="E-mail"
                inputMode="email"
                defaultValue={state.email}
                error={state.errors?.email}
            />
            <PasswordInput
                name="password"
                label="Senha"
                defaultValue={state.password}
                error={state.errors?.password}
            />

            <SubmitButton label="Log in" isLoading={isPending}/>
        </form>
    );
}
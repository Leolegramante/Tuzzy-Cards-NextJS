'use client'

import {SubmitButton, TextInput} from "@/components";
import {UserDto} from "@/helpers";
import {useState} from "react";
import {handleVerifyEmailForm} from "./actions";

interface Errors {
    email?: string | undefined;
}

interface VerifyEmailFormProps {
    setUserDataAction: (arg0: UserDto) => void;
}

export function VerifyEmailForm({setUserDataAction}: VerifyEmailFormProps) {
    const [isLoading, setIsLoading] = useState<boolean | undefined>(undefined);
    const [errors, setErrors] = useState<Errors>({email: undefined});

    const formAction = async (formData: FormData) => {
        setIsLoading(true);
        const {errors, user} = await handleVerifyEmailForm(formData)
        setIsLoading(false);
        setErrors(errors);
        if (user)
            setUserDataAction(user);
    }

    return (
        <form action={formAction}>
            <TextInput
                name="email"
                label="E-mail"
                inputMode="email"
                error={errors.email}
            />
            <SubmitButton label='Cadastrar' isLoading={isLoading}/>
        </form>
    );
}
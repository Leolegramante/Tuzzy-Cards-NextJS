'use client'

import {SubmitButton, TextInput} from "@/components";
import {
    CreateUserAddressState,
    handleCreateUserAddressForm
} from "@/components/Checkout/Payment/AddressInformation/AddressForm/actions";
import {AddressSearchDto} from "@/helpers";
import {useActionState, useCallback, useEffect, useMemo, useRef} from "react";

interface AddressFormProps {
    userAddress: AddressSearchDto,
    onCreateAction: () => void;
    className?: string
}

export function AddressForm({userAddress, onCreateAction}: AddressFormProps) {
    const formRef = useRef<HTMLFormElement>(null);

    const initialState: CreateUserAddressState = useMemo(() => ({
        isValid: undefined,
        errors: null,
        street: userAddress.logradouro,
        complement: userAddress.complemento,
        number: userAddress.unidade,
        city: userAddress.localidade,
        sate: userAddress.estado
    }), [userAddress]);

    const [state, formAction, isPending] = useActionState<CreateUserAddressState>(async (currentState: CreateUserAddressState) => {
        const formData = new FormData(formRef.current as HTMLFormElement);
        formData.append("zipCode", userAddress.cep)

        return await handleCreateUserAddressForm(currentState, formData)
    }, initialState)

    const handleSuccess = useCallback(() => {
        onCreateAction();
    }, [onCreateAction]);

    useEffect(() => {
        if (state.isValid === true) {
            handleSuccess();
        }
    }, [state.isValid, handleSuccess]);

    return (
        <form className='w-full' ref={formRef} action={formAction}>
            <TextInput
                name='street'
                label='Logadouro'
                defaultValue={userAddress.logradouro}
                error={state?.errors?.street}
            />
            <TextInput
                name='complement'
                label='complemento'
                defaultValue={userAddress.complemento}
            />
            <div className='flex items-center gap-2'>
                <TextInput
                    name='number'
                    label='Número'
                    defaultValue={userAddress.unidade}
                />
                <TextInput
                    name='city'
                    label='cidade'
                    defaultValue={userAddress.localidade}
                />
                <TextInput
                    name='state'
                    label='Estado'
                    defaultValue={userAddress.estado}
                />
            </div>
            <div className="relative flex items-center justify-between py-2">
                <div className="ml-3 text-sm">
                    <label htmlFor={`isDefault`} className="font-medium text-principal">
                        Deseja que esse endereço seja seu endereço padrão?
                    </label>
                </div>

                <input
                    id='isDefault'
                    name="isDefault"
                    type="checkbox"
                    defaultChecked={true}
                    className="relative size-4 rounded-full border appearance-auto border-gray-300 bg-white checked:bg-principal"
                />
            </div>

            <SubmitButton type='submit' label='Cadastrar' className='mt-2' isLoading={isPending}/>
        </form>
    )
}
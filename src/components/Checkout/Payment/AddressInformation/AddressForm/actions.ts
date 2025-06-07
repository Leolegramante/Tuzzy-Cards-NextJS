'use server'

import {CreateUserAddressDTO} from "@/helpers";
import {getZodErrors} from "@/helpers/zod";
import {CreateUserAddress} from "@/service";
import {z} from "zod";

export type CreateUserAddressError =
    Record<'zipCode' | 'street' | 'complement' | 'number' | 'city' | 'state' | 'isDefault', string | undefined>
    | null

export type CreateUserAddressState = {
    isValid: boolean | undefined;
    errors: CreateUserAddressError
    street: string,
    complement: string,
    number: string,
    city: string,
    sate: string
}

const userAddressSchema = z.object({
    street: z.string(),
    complement: z.string(),
    number: z.string(),
    city: z.string(),
    state: z.string(),
})

const validadeForm = (formData: FormData) => {
    const parsedData = Object.fromEntries(formData)
    const validation = userAddressSchema.safeParse(parsedData)
    if (!validation.success) return {
        isValid: false,
        errors: getZodErrors(validation.error),
        ...parsedData
    } as CreateUserAddressState;

    return {isValid: true, errors: null, ...parsedData} as CreateUserAddressState
}

const mapFormDataToAddressDto = (formData: FormData): CreateUserAddressDTO => ({
    zipCode: formData.get('zipCode') as string,
    street: formData.get('street') as string,
    complement: formData.get('complement') as string,
    number: formData.get('number') as string,
    city: formData.get('city') as string,
    state: formData.get('state') as string,
    isDefault: formData.get('isDefault') === 'on',
})

const createError = (message: string): CreateUserAddressError => ({
    zipCode: undefined,
    street: message,
    complement: undefined,
    number: undefined,
    city: undefined,
    state: undefined,
    isDefault: undefined,
})

const processCreateUSerAddress = async (data: CreateUserAddressDTO): Promise<{
    isValid: boolean,
    errors: CreateUserAddressError
}> => {
    const {isValid} = await CreateUserAddress(data)

    if (!isValid) return {isValid: false, errors: createError('Erro ao criar endereço')}
    return {isValid: true, errors: null}
}

export const handleCreateUserAddressForm = async (_prevState: CreateUserAddressState, formData: FormData) => {
    const validation = validadeForm(formData)

    if (!validation.isValid) return validation
    const addressDto = mapFormDataToAddressDto(formData)
    const result = await processCreateUSerAddress(addressDto)

    return {...validation, ...result}
}
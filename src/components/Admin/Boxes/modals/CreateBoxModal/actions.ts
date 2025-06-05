'use server'

import {BoxDto} from "@/helpers";
import {getZodErrors} from "@/helpers/zod";
import {CreateBox} from "@/service";
import {z} from "zod";

export type BoxError = Record<
    "name" | "width" | "height" | "depth",
    string | undefined
> | null;

export type CreateBoxState = {
    isValid: boolean | undefined;
    errors: BoxError;
    name: string;
    width: number;
    height: number;
    depth: number;
};

const formatStringToNumber = (value: string): number => {
    const formattedValue = value.replace(',', ""); // Remove non-numeric characters
    return parseInt(formattedValue);
}

const boxSchema = z.object({
    name: z.string().min(1, "Nome é obrigatório"),
    width: z.string(),
    height: z.string(),
    depth: z.string(),
});

const validateBoxForm = (formData: FormData): CreateBoxState => {
    const parsedData = Object.fromEntries(formData);
    const validation = boxSchema.safeParse(parsedData);

    if (!validation.success) {
        return {
            isValid: false,
            errors: getZodErrors(validation.error),
            ...parsedData
        } as CreateBoxState;
    }

    return {isValid: true, errors: null, ...parsedData} as CreateBoxState;
}

const mapFormDataToBoxDto = (formData: FormData): BoxDto => ({
    name: formData.get("name") as string,
    width: formData.get("width") ? formatStringToNumber(formData.get("width") as string) : 0,
    height: formData.get("height") ? formatStringToNumber(formData.get("height") as string) : 0,
    depth: formData.get("depth") ? formatStringToNumber(formData.get("depth") as string) : 0,
})

const createBoxError = (message: string): BoxError => ({
    name: message,
    width: undefined,
    height: undefined,
    depth: undefined,
})

const processBoxCreation = async (boxDto: BoxDto): Promise<{ isValid: boolean; errors: BoxError }> => {
    const {isValid, box} = await CreateBox(boxDto)

    if (!isValid || !box?.id) {
        return {isValid: false, errors: createBoxError("Erro ao cadastrar caixa")};
    }

    return {isValid: true, errors: null};
}

export const handleBoxForm = async (_preState: CreateBoxState, formData: FormData): Promise<CreateBoxState> => {
    const validation = validateBoxForm(formData)

    if (!validation.isValid) return validation;

    const boxDto = mapFormDataToBoxDto(formData);

    const result = await processBoxCreation(boxDto);

    return {...validation, ...result}
}


'use server'

import {BoxDto} from "@/helpers";
import {getZodErrors} from "@/helpers/zod";
import {EditBox} from "@/service";
import {z} from "zod";

export type BoxError = Record<
    "name" | "width" | "height" | "depth",
    string | undefined
> | null;

export type EditBoxState = {
    isValid: boolean | undefined;
    errors: BoxError;
    id: number
    name: string;
    width: number;
    height: number;
    depth: number;
};

const formatStringToNumber = (value: string): number => {
    console.log(value)
    const formattedValue = value.replace(',', ""); // Remove non-numeric characters
    return parseInt(formattedValue);
}

const boxSchema = z.object({
    name: z.string().min(1, "Nome é obrigatório"),
    width: z.string(),
    height: z.string(),
    depth: z.string(),
});

const validateBoxForm = (formData: FormData): EditBoxState => {
    const parsedData = Object.fromEntries(formData);
    const validation = boxSchema.safeParse(parsedData);

    if (!validation.success) {
        return {
            isValid: false,
            errors: getZodErrors(validation.error),
            ...parsedData
        } as EditBoxState;
    }

    return {isValid: true, errors: null, ...parsedData} as EditBoxState;
}

const mapFormDataToBoxDto = (formData: FormData): BoxDto => ({
    id: formData.get('id') ? parseInt(formData.get('id') as string) : 0,
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

const processBoxEdition = async (boxDto: BoxDto): Promise<{ isValid: boolean; errors: BoxError }> => {
    const {isValid, box} = await EditBox(boxDto)

    if (!isValid || !box?.id) {
        return {isValid: false, errors: createBoxError("Erro ao cadastrar caixa")};
    }

    return {isValid: true, errors: null};
}

export const handleBoxForm = async (_preState: EditBoxState, formData: FormData): Promise<EditBoxState> => {
    const validation = validateBoxForm(formData)

    if (!validation.isValid) return validation;

    const boxDto = mapFormDataToBoxDto(formData);

    const result = await processBoxEdition(boxDto);

    return {...validation, ...result}
}


"use server";

import {ProductDto, toCents} from "@/helpers";
import {getZodErrors} from "@/helpers/zod";
import {CreateProduct, SendImages} from "@/service";
import {z} from "zod";

export type ProductError = Record<
    "name" | "sku" | "price" | "quantityInStock" | "categories" | "subCategories" | "description",
    string | undefined
> | null;

export type CreateProductState = {
    isValid: boolean | undefined;
    errors: ProductError;
    name: string;
    sku: string;
    price: number;
    quantityInStock: number;
    categories: number[];
    subCategories: number[];
    description: string;
    width: number
    height: number;
    depth: number;
    weight: number;
};

const formatStringToNumber = (value: string): number => {
    const formattedValue = value.replace(',', ""); // Remove non-numeric characters
    return parseInt(formattedValue);
}

// Zod schema for validation
const productSchema = z.object({
    name: z.string(),
    sku: z.string(),
    price: z
        .string()
        .regex(/^R\$ \d{1,3}(\.\d{3})*,\d{2}$/, "Formato inválido de valor")
        .refine((val) => !isNaN(toCents(val)), {
            message: "Valor inválido",
        }),
    quantityInStock: z.string(),
    description: z.string(),
    width: z.string(),
    height: z.string(),
    depth: z.string(),
    weight: z.string(),
});

// Util function to encapsulate repeated logic
const validateProductForm = (formData: FormData): CreateProductState => {
    const parsedData = Object.fromEntries(formData);
    const validation = productSchema.safeParse(parsedData);

    // Return early if invalid
    if (!validation.success) {
        return {
            isValid: false,
            errors: getZodErrors(validation.error),
            ...parsedData,
        } as CreateProductState;
    }

    // Return if valid
    return {isValid: true, errors: null, ...parsedData} as CreateProductState;
};

const mapFormDataToProductDto = (formData: FormData): ProductDto => ({
    name: formData.get("name") as string,
    sku: formData.get("sku") as string,
    price: toCents(String(formData.get("price"))),
    quantityInStock: Number(formData.get("quantityInStock")),
    categories: formData
        .getAll("categories")
        .map(Number)
        .filter((value) => !isNaN(value) && value !== 0),
    subCategories: formData
        .getAll("subCategories")
        .map(Number)
        .filter((value) => !isNaN(value) && value !== 0),
    description: formData.get("description") as string,
    width: formData.get('width') ? formatStringToNumber(formData.get('width') as string) : 0,
    height: formData.get('height') ? formatStringToNumber(formData.get('height') as string) : 0,
    depth: formData.get('depth') ? formatStringToNumber(formData.get('depth') as string) : 0,
    weight: formData.get('weight') ? formatStringToNumber(formData.get('weight') as string) : 0,
});

const createProductError = (message: string): ProductError => ({
    name: message,
    sku: undefined,
    price: undefined,
    quantityInStock: undefined,
    categories: undefined,
    subCategories: undefined,
    description: undefined,
});

const processProductCreation = async (
    productDto: ProductDto,
    images: File[]
): Promise<{ isValid: boolean; errors: ProductError }> => {
    const {isValid, product} = await CreateProduct(productDto);

    if (!isValid || !product?.id) {
        return {isValid: false, errors: createProductError("Erro ao cadastrar produto")};
    }

    // If there are images, attempt to send them
    if (images.length > 0) {
        const sendImagesResponse = await SendImages(images, `${product.id}`);
        return {
            isValid: sendImagesResponse?.isValid ?? false,
            errors: sendImagesResponse?.isValid
                ? null
                : createProductError("Erro ao enviar imagens."),
        };
    }

    return {isValid: true, errors: null}; // Success without images
};

export const handleProductForm = async (
    _preState: CreateProductState,
    formData: FormData,
    images: File[]
): Promise<CreateProductState> => {
    // Validate the form data
    const validation = validateProductForm(formData);

    if (!validation.isValid) return validation;

    // Transform and process product creation
    const productDto = mapFormDataToProductDto(formData);

    // Call the processProductCreation and determine final state
    const result = await processProductCreation(productDto, images);

    return {...validation, ...result};
};
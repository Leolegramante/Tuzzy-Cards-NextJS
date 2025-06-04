"use server";

import {ProductDto, toCents} from "@/helpers";
import {getZodErrors} from "@/helpers/zod";
import {EditProduct, RemoveImage, SendImages} from "@/service";
import {z} from "zod";

export type ProductError = Record<
    "name" | "sku" | "price" | "quantityInStock" | "categories" | "subCategories" | "description",
    string | undefined
> | null;

export type EditProductState = {
    isValid: boolean | undefined;
    errors: ProductError;
    id: number;
    name: string;
    sku: string;
    price: string;
    quantityInStock: number;
    categories: number[];
    subCategories: number[];
    description: string;
    width: number;
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

const validateProductForm = (formData: FormData): EditProductState => {
    const parsedData = Object.fromEntries(formData);
    const validation = productSchema.safeParse(parsedData);
    if (!validation.success) {
        return {
            isValid: false,
            errors: getZodErrors(validation.error),
            ...parsedData,
        } as EditProductState;
    }

    return {isValid: true, errors: null, ...parsedData} as EditProductState;
};

const mapFormDataToProductDto = (formData: FormData): ProductDto => ({
    id: Number(formData.get("id")),
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

const editProductError = (message: string): ProductError => ({
    name: message,
    sku: undefined,
    price: undefined,
    quantityInStock: undefined,
    categories: undefined,
    subCategories: undefined,
    description: undefined,
});

const processEditProduct = async (
    productDto: ProductDto,
    images: File[]
): Promise<{ isValid: boolean; errors: ProductError }> => {
    const {isValid, product} = await EditProduct(productDto);
    if (!isValid || !product?.id) {
        return {isValid: false, errors: editProductError("Erro ao editar produto")};
    }
    if (images.length > 0) {
        const sendImagesResponse = await SendImages(images, `${product.id}`);
        return {
            isValid: sendImagesResponse?.isValid ?? false,
            errors: sendImagesResponse?.isValid
                ? null
                : editProductError("Erro ao enviar imagens."),
        };
    }

    return {isValid: true, errors: null}; // Success without images
};

export const handleProductForm = async (
    _preState: EditProductState,
    formData: FormData,
    images: File[]
): Promise<EditProductState> => {
    // Validate the form data
    const validation = validateProductForm(formData);

    if (!validation.isValid) return validation;

    // Transform and process product creation
    const productDto = mapFormDataToProductDto(formData);

    // Call the processEditProduct and determine final state
    const result = await processEditProduct(productDto, images);

    return {...validation, ...result};
};

export const handleRemoveProductImage = async (id: number) => {
    return await RemoveImage(id)
}
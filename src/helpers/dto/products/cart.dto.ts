export type ValidateCartResponseDto = {
    isValid: boolean;
    message: string;
    stockStatus: { id: number, inStock: boolean }[]
}

export type ValidateCartDto = {
    products: { id: number, quantity: number }[]
}
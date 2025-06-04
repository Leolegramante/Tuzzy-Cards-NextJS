export type ProductDto = {
    id?: number;
    uuid?: string;
    sku: string;
    name: string;
    description: string;
    price: number;
    priceInCents?: number;
    quantityInStock: number;
    categories: number[];
    subCategories: number[];
    images?: File[];
    stock?: Stock;
    productCategories?: { id: number, name: string }[];
    productSubCategories?: { id: number, name: string }[];
    backendImages?: Image[],
    width?: number;
    height?: number;
    depth?: number;
    weight?: number;
}

export type Image = {
    url: string;
    id: number;
    productId: number;
}

export type Stock = {
    quantityInStock: number;
}
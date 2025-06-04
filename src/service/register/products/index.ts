"use server"

import {
    CountProductsDto,
    CreateProductResponseDto,
    EditProductResponseDto,
    GetAllProductsResponseDto,
    getJWT,
    GetProductByIdResponseDto,
    PaginationDto,
    ProductDto
} from "@/helpers";

export const CreateProduct = async (data: ProductDto): Promise<CreateProductResponseDto> => {
    const token = await getJWT()
    if (!token) return {isValid: false, message: 'Error'}
    const response = await fetch(`${process.env.BASE_URL}/products`, {
        method: "POST",
        headers: {
            Accept: "application/json",
            'Authorization': `Bearer ${token}`,
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    })
    if (!response.ok) {
        throw {isValid: false, message: `${response.status}`};
    }
    const responseData: GetAllProductsResponseDto = await response.json();

    if (responseData.isValid) {
        return responseData;
    }

    return {isValid: false, message: 'Error create product'};
}

export const GetAllProducts = async ({
                                         limit = 10,
                                         offset = 0,
                                         sortBy = 'createdAt',
                                         order = 'asc',
                                         categoryIds = '',
                                         subCategoryIds = '',
                                         inStock = undefined
                                     }: PaginationDto): Promise<GetAllProductsResponseDto> => {
    const response = await fetch(`${process.env.BASE_URL}/products?limit=${limit}&offset=${offset}&sortBy=${sortBy}&order=${order}&categoryIds=${categoryIds}&subCategoryIds=${subCategoryIds}&inStock=${inStock}`, {
        method: "GET",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
    })
    if (!response.ok) {
        throw {isValid: false, message: `${response.status}`};
    }

    const responseData: GetAllProductsResponseDto = await response.json();
    if (responseData.isValid) {
        return responseData;
    }

    return {isValid: false, message: `${response.status}`};
}

export const GetProductsBySku = async (sku: string): Promise<GetProductByIdResponseDto> => {
    const response = await fetch(`${process.env.BASE_URL}/products/by-id/${sku}`, {
        method: "GET",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
    })
    if (!response.ok) {
        throw {isValid: false, message: `${response.status}`};
    }

    const responseData: GetProductByIdResponseDto = await response.json();
    if (responseData.isValid) {
        return responseData;
    }

    return {isValid: false, message: `${response.status}`};
}

export const SendImages = async (images: File[], id: string): Promise<CreateProductResponseDto> => {
    const token = await getJWT()
    if (!token) return {isValid: false, message: 'Error'}

    const formData = new FormData();
    images.forEach(image => {
        formData.append('images', image);
    })
    const response = await fetch(`${process.env.BASE_URL}/products/images/${id}`, {
        method: 'PUT',
        headers: {
            'Authorization': `Bearer ${token}`,
        },
        body: formData,
    });

    if (!response.ok) {
        throw {isValid: false, message: `${response.status}`};
    }

    const responseData: GetProductByIdResponseDto = await response.json();
    if (responseData.isValid) {
        return responseData;
    }

    return {isValid: false, message: `${response.status}`};
}

export const CountProducts = async (): Promise<CountProductsDto> => {
    const token = await getJWT()
    if (!token) return {isValid: false, count: 0, amount: 0, totalPrice: 0};

    const response = await fetch(`${process.env.BASE_URL}/products/count`, {
        method: "GET",
        headers: {
            Accept: "application/json",
            'Authorization': `Bearer ${token}`,
            "Content-Type": "application/json",
        },
    });

    if (!response.ok) {
        return {isValid: false, count: 0, amount: 0, totalPrice: 0};
    }

    const responseData: CountProductsDto = await response.json();
    if (responseData.isValid) {
        return responseData;
    }

    return {isValid: false, count: 0, amount: 0, totalPrice: 0};
}

export const RemoveImage = async (id: number): Promise<{ isValid: boolean }> => {
    const token = await getJWT()
    if (!token) return {isValid: false}

    const response = await fetch(`${process.env.BASE_URL}/products/images/${id}`, {
        method: 'delete',
        headers: {
            Accept: "application/json",
            'Authorization': `Bearer ${token}`,
            "Content-Type": "application/json",
        },
    });

    if (!response.ok) {
        throw {isValid: false};
    }

    const responseData: { isValid: boolean } = await response.json();
    if (responseData.isValid) {
        return responseData;
    }

    return {isValid: false}
}

export const EditProduct = async (data: ProductDto): Promise<EditProductResponseDto> => {
    const token = await getJWT()
    if (!token) return {isValid: false, message: 'Error'}
    
    const response = await fetch(`${process.env.BASE_URL}/products/${data.id}`, {
        method: "PATCH",
        headers: {
            Accept: "application/json",
            'Authorization': `Bearer ${token}`,
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    })

    if (!response.ok) {
        throw {isValid: false, message: `${response.status}`};
    }

    const responseData: EditProductResponseDto = await response.json();
    if (responseData.isValid) {
        return responseData;
    }

    return {isValid: false, message: 'Error edit product'};
}
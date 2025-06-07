export type GetAddressFromZipCodeDto = {
    isValid: boolean,
    address?: AddressSearchDto
}

export type AddressSearchDto = {
    cep: string;
    logradouro: string;
    complemento: string;
    unidade: string;
    localidade: string;
    estado: string;
};
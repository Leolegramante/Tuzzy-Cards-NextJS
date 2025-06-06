import {InvalidShipmentDto, ValidShipmentDto} from "@/helpers";

export type CalculateShipmentResponseDto = {
    isValid: boolean,
    message?: string,
    validShipment?: ValidShipmentDto[],
    invalidShipment?: InvalidShipmentDto[]
    boxId: number
}

export type CalculateShipmentDto = {
    postalCode: string,
    weight: number,
    volume: number,
    total: number,
}
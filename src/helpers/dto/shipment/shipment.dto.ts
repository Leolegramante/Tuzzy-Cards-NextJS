export type ValidShipmentDto = {
    id: number;
    name: string;
    price: string;
    discount: string;
    delivery_time: number;
    company: {
        id: number;
        name: string
    }
    error?: string
}

export type InvalidShipmentDto = {
    id: number;
    name: string;
    error?: string
    company: {
        id: number;
        name: string
    }
}

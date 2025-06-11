interface ShipmentProps {
    id: number
    name: string
    price: number
    boxId: number
    addressId: number
}

interface PaymentProps {
    type: string
    number: string
    name: string
    expiry: string
    cvv: string
    installments: number
}

interface threeDSecureProps {
    ipAddress: string,
    userAgent: string,
    device: {
        colorDepth: number,
        screenHeight: number,
        screenWidth: number,
        timeZoneOffset: number
    }
}

export type CreateOrderDto = {
    userUuid?: string;
    products: { productId: number; quantity: number, price: number }[];
    total: number;
    weight: number;
    shipment: ShipmentProps;
    payment: PaymentProps
    threeDSecureProps: threeDSecureProps

}

export type CreateOrderResponseDto = {
    isValid: boolean;
    message: string;
    qrCodeProps?: {
        dateTimeExpiration: string;
        qrCodeData: string;
        qrCodeImage: string;
    }
}
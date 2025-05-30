export type OrderDto = {
    id: number;
    userId: number;
    status: string;
    total: number;
    saleDate: Date;
    user: User;
    items: OrderItem[];
}

type User = {
    id: number;
    uuid: string;
    email: string;
    firstName: string;
    lastName: string;
    username: string;
}

type OrderItem = {
    id: number;
    productId: number;
    quantity: number;
    price: number;
    product: {
        id: number;
        name: string;
        description: string;
        price: number;
    }
}
import {getZodErrors} from "@/helpers/zod";
import {EditOrder} from "@/service";
import {z} from "zod";

export type OrderError = Record<"status" | 'id', string | undefined> | null;

export type EditOrderState = {
    isValid: boolean | undefined;
    errors: OrderError;
    id: string;
    status: string;
};

const orderSchema = z.object({
    id: z.string(),
    status: z.enum(['PENDING', 'PROCESSING', 'APPROVED', 'AWAITING_PICKUP', 'SHIPPED', 'DELIVERED', 'CANCELED']),
})

const validateOrderForm = (formData: FormData): EditOrderState => {
    const parsedData = Object.fromEntries(formData);
    const validation = orderSchema.safeParse(parsedData);
    if (!validation.success) {
        return {
            isValid: false,
            errors: getZodErrors(validation.error),
            ...parsedData,
        } as EditOrderState;
    }

    return {isValid: true, errors: null, ...parsedData} as EditOrderState;
};

const mapFormDataToOrderData = (formData: FormData): { id: string, status: string } => ({
    status: formData.get("status") as string,
    id: formData.get("id") as string,
})

const editOrderError = (message: string): OrderError => ({
    id: message,
    status: undefined
})

const processEditOrder = async (id: string, status: string): Promise<{ isValid: boolean, errors: OrderError }> => {
    const {isValid} = await EditOrder(id, status);
    if (!isValid) {
        return {
            isValid: false,
            errors: editOrderError('Erro ao editar o pedido'),
        };
    }
    return {isValid: true, errors: null,};
}

export const handleEditOrder = async (_prevState: EditOrderState, formData: FormData): Promise<EditOrderState> => {
    const validation = validateOrderForm(formData);
    if (!validation.isValid) {
        return validation;
    }

    const orderData = mapFormDataToOrderData(formData);

    const result = await processEditOrder(orderData.id, orderData.status);

    return {...validation, ...result};
}
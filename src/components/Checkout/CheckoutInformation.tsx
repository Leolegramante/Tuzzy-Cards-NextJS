'use client'

import {SubmitButton} from "@/components";
import {OrderDto} from "@/helpers";
import {useCartStore} from "@/store/useCartStore";
import {formatCentsToBRL} from "@/utils";
import Link from "next/link";
import {useEffect, useState} from "react";
import {createOrder, validateCart} from "./actions";

interface CheckoutInformationProps {
    onCheckoutAction: () => void;
    onOderCreatedAction: (order: OrderDto) => void
}

export default function CheckoutInformation({onCheckoutAction, onOderCreatedAction}: CheckoutInformationProps) {
    const [total, setTotal] = useState<number>(0);
    const [loading, setLoading] = useState(false);
    const {items, getCartTotal, shipment, updateStock} = useCartStore();

    useEffect(() => {
        setTotal(getCartTotal());
    }, [getCartTotal, items]);

    const validateCartAction = async () => {
        setLoading(true)
        const products = items.map(product => ({id: product.id, quantity: product.quantity}))
        const {stockStatus, isValid} = await validateCart({products})
        console.log(isValid)
        if (isValid) {
            const products = items.map(product => ({
                productId: product.id,
                quantity: product.quantity,
                price: product.price
            }))
            const createOrderResponse = await createOrder({products, total: total + shipment.price})
            if (createOrderResponse.isValid && createOrderResponse.order) {
                onOderCreatedAction(createOrderResponse.order)
                onCheckoutAction()
            }
        } else if (!isValid && stockStatus.length > 0) {
            stockStatus.map((item) => {
                updateStock(item.id, item.inStock)
            })
        }
        setLoading(false)
    }

    return (
        <div
            className="mt-4 w-full rounded-lg border border-gray-200 bg-white shadow-xs max-h-[350px]">
            {items.length > 0 && (
                <>
                    <dl className="space-y-6 border-t border-gray-200 px-4 py-6 sm:px-6">
                        <div className="flex items-center justify-between">
                            <dt className="text-md">Valor dos produtos</dt>
                            <dd className="text-sm font-medium text-gray-900">{formatCentsToBRL(total)}</dd>
                        </div>
                        <div className="flex items-center justify-between">
                            <dt className="text-md">Envio</dt>
                            <dd className="text-sm font-medium text-gray-900">{formatCentsToBRL(shipment.price)}</dd>
                        </div>
                        <div className="flex items-center justify-between border-t border-gray-200 pt-6">
                            <dt className="text-base font-medium">Total</dt>
                            <dd className="text-base font-medium text-gray-900">{formatCentsToBRL(total + shipment.price)}</dd>
                        </div>
                    </dl>
                    <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
                        <SubmitButton
                            onClick={validateCartAction}
                            type="submit"
                            className="text-base font-medium text-fy shadow-xs hover:bg-fy hover:text-principal"
                            isLoading={loading}
                        >
                            Prosseguir para pagamento
                        </SubmitButton>
                    </div>
                </>
            )}
            <div className='flex flex-col flex-1 items-center justify-center'>
                <Link
                    href="/"
                    className="flex items-center justify-center px-6 py-3  font-medium text-fy cursor-pointer"
                >
                    continuar comprando
                </Link>
            </div>
        </div>

    )
}
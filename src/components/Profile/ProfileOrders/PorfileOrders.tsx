'use client'

import {FetchError, LoadingData} from "@/components";
import {getUserOrders} from "@/components/Profile/ProfileOrders/actions";
import {OrderDto} from "@/helpers";
import {useEffect, useState} from "react";

enum OrderStatus {
    PENDING = 'Aguardando pagamento',
    APPROVED = 'Pago',
    PROCESSING = 'Processando pagamento',
    AWAITING_PICKUP = 'Aguardando retirada',
    SHIPPED = 'Enviado',
    DELIVERED = 'Entregue',
    CANCELED = 'Cancelado',
}

export function ProfileOrders() {
    const [orders, setOrders] = useState<OrderDto[] | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<boolean>(false);

    useEffect(() => {
        setIsLoading(true);
        const fetchOrders = async () => {
            return await getUserOrders();
        }

        fetchOrders().then((res) => {
            if (res.isValid && res.orders) {
                setOrders(res.orders);
                setIsLoading(false);
            } else {
                setError(false)
                setIsLoading(false);
            }
        })
    }, []);
    return (
        <div
            className="col-span-2 flex flex-col items-center border-r rounded-lg border-gray-200 bg-white p-6 h-fit">
            {isLoading && (<LoadingData/>)}
            {!isLoading && error && (<FetchError/>)}
            {!isLoading && orders && (
                <>
                    <table className="w-full divide-y divide-gray-300">
                        <thead>
                        <tr>
                            <th scope="col"
                                className="py-3.5 pr-3 pl-2 text-left text-sm font-semibold text-principal min-w-[200px] max-w-[250px]">
                                Número do pedido
                            </th>
                            <th scope="col"
                                className="py-3.5 pr-3 pl-2 text-left text-sm font-semibold text-principal hidden md:table-cell ">
                                Data do pedido
                            </th>
                            <th scope="col"
                                className="py-3.5 pr-3 pl-2 text-left text-sm font-semibold text-principal ">
                                Status do pedido
                            </th>
                        </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                        {orders.map((order) => (
                            <tr key={order.id}>
                                <td className="py-4 pl-2 text-sm font-medium whitespace-nowrap text-principal min-w-[200px] max-w-[200px] md:max-w-[400px] text-ellipsis overflow-hidden">
                                    {order.id.toString().padStart(5, '0')}
                                </td>
                                <td className="py-4 pl-2 text-sm font-medium whitespace-nowrap text-principal min-w-[151px] hidden md:table-cell">
                                    {new Date(order.saleDate).toLocaleDateString('pt-BR', {
                                        day: '2-digit',
                                        month: '2-digit',
                                        year: 'numeric'
                                    })}
                                </td>
                                <td className="py-4 pl-2 text-sm font-medium whitespace-nowrap text-principal min-w-[80px]">
                                    {OrderStatus[order.status as keyof typeof OrderStatus]}
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </>
            )}
        </div>
    )
}
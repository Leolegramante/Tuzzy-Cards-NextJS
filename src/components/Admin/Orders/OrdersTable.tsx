'use client'

import {OrderDto} from "@/helpers";
import {formatCentsToBRL} from "@/utils";

enum OrderStatus {
    PENDING = 'Aguardando pagamento',
    APPROVED = 'Pago',
    PROCESSING = 'Processando pagamento',
    AWAITING_PICKUP = 'Aguardando retirada',
    SHIPPED = 'Enviado',
    DELIVERED = 'Entregue',
    CANCELED = 'Cancelado',
}

interface OrdersTableProps {
    orders: OrderDto[];
    selectedOrderAction: (order: OrderDto) => void;
}

export function OrdersTable({orders, selectedOrderAction}: OrdersTableProps) {
    return (
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
                    className="py-3.5 pr-3 pl-2 text-left text-sm font-semibold text-principal hidden md:table-cell ">
                    Valor total do pedido
                </th>
                <th scope="col"
                    className="py-3.5 pr-3 pl-2 text-left text-sm font-semibold text-principal hidden md:table-cell ">
                    Usuário
                </th>
                <th scope="col"
                    className="py-3.5 pr-3 pl-2 text-left text-sm font-semibold text-principal ">
                    Status do pedido
                </th>
                <th scope="col" className="relative py-3.5 pr-4 pl-3">
                    <span className="sr-only">Edit</span>
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
                    <td className="py-4 pl-2 text-sm font-medium whitespace-nowrap text-principal min-w-[151px] hidden md:table-cell">
                        {formatCentsToBRL(order.total)}
                    </td>
                    <td className="py-4 pl-2 text-sm font-medium whitespace-nowrap text-principal min-w-[151px] hidden md:table-cell">
                        {order.user.firstName} {order.user.lastName}
                    </td>
                    <td className="py-4 pl-2 text-sm font-medium whitespace-nowrap text-principal min-w-[80px]">
                        {OrderStatus[order.status as keyof typeof OrderStatus]}
                    </td>
                    <td className="relative py-4 pr-4 pl-3 text-right text-sm font-medium whitespace-nowrap">
                        <button type="button" className="text-principal hover:text-fy cursor-pointer"
                                onClick={() => selectedOrderAction(order)}>
                            Ver detalhes<span className="sr-only">, {order.id}</span>
                        </button>
                    </td>
                </tr>
            ))}
            </tbody>
        </table>
    )
}
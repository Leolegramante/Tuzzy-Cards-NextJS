'use client'

import {FetchError, LoadingData} from "@/components";
import {getOrders} from "@/components/Admin/Orders/actions.";
import {OrderDetailsModal} from "@/components/Admin/Orders/modals/OrderDetailsModal";
import {OrdersTable} from "@/components/Admin/Orders/OrdersTable";
import {OrderDto} from "@/helpers";
import {useEffect, useState} from "react";

export function Orders() {
    const [orders, setOrders] = useState<OrderDto[] | null>(null);
    const [selectedOrder, setSelectedOrder] = useState<OrderDto | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<boolean>(false);
    const [isOrderDetailsModalOpen, setIsOrderDetailsModalOpen] = useState(false);

    const fetchOrders = async () => {
        const res = await getOrders();
        if (res.isValid && res.orders) {
            setOrders(res.orders);
            setIsLoading(false);
        } else {
            setError(false)
            setIsLoading(false);
        }
    }

    useEffect(() => {
        setIsLoading(true);

        fetchOrders().then()
    }, []);

    const handleSelectOrder = async (oder: OrderDto) => {
        setSelectedOrder(oder);
        await handleOpenOrderDetailsModalOpen()
    }

    const handleOpenOrderDetailsModalOpen = async () => {
        setIsOrderDetailsModalOpen((prev) => !prev);
        if (isOrderDetailsModalOpen) {
            await fetchOrders();
        }
    }

    return (
        <div
            className='col-span-2 w-full flex flex-col items-center border-r rounded-lg border-gray-200 bg-white p-6 h-fit'>
            {isLoading && (<LoadingData/>)}
            {!isLoading && error && (<FetchError/>)}
            {!isLoading && orders && (
                <OrdersTable orders={orders} selectedOrderAction={handleSelectOrder}/>
            )}
            {selectedOrder && isOrderDetailsModalOpen && (
                <OrderDetailsModal order={selectedOrder} isOpen={isOrderDetailsModalOpen}
                                   onCloseAction={handleOpenOrderDetailsModalOpen}/>
            )}
        </div>
    )
}
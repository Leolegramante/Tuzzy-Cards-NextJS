'use client'

import {SubmitButton} from "@/components";
import {CreateOrderErrorModal, CreateOrderSuccessfulModal} from "@/components/Checkout/Payment/OrderSummary/Modals";
import {UseDeviceInfo} from "@/hooks/useDeviceInfo";
import {useCartStore} from "@/store/useCartStore";
import {formatCentsToBRL} from "@/utils";
import Image from "next/image";
import {redirect} from "next/navigation";
import {useEffect, useState} from "react";
import {createOrder} from "./actions";
import {PixModal, PixProps} from "./Modals/PixModal";

export function OrderSummary() {
    const [total, setTotal] = useState<number>(0);
    const [isSuccessModalOpen, setSuccessModalOpen] = useState<boolean>(false);
    const [isErrorModalOpen, setIsErrorModalOpen] = useState<boolean>(false);
    const [isPixModalOpen, setIsPixModalOpen] = useState<boolean>(false);
    const [pix, setPix] = useState<PixProps>({dateTimeExpiration: "", qrCodeData: "", qrCodeImage: ""});
    const {deviceInfo} = UseDeviceInfo()
    const {items, getCartTotal, shipment, card, getOrderWeight, cleanCart} = useCartStore();

    useEffect(() => {
        setTotal(getCartTotal());
    }, [getCartTotal, items]);

    const handleCreateOrderSuccessfulModalOpen = () => {
        if (isSuccessModalOpen) {
            cleanCart()
            redirect('/')
        }
        setSuccessModalOpen((prevState) => !prevState);
    }

    const handleCreateOrderErrorModalOpen = () => {
        setIsErrorModalOpen((prevState) => !prevState);
    }

    const handlePixModalOpen = () => {
        if (isPixModalOpen) {
            handleCreateOrderSuccessfulModalOpen();
        }
        setIsPixModalOpen((prevState) => !prevState);
    }

    const createOrderRequest = async () => {
        const orderWight = getOrderWeight()

        const orderProducts = items.map((item) => {
            return {productId: item.id, quantity: item.quantity, price: item.price}
        })

        const orderShipment = {
            id: shipment.id ? shipment.id : 0,
            name: shipment.name,
            price: shipment.price,
            boxId: shipment.boxId,
            addressId: shipment.addressId ? shipment.addressId : 0,
        }

        const res = await createOrder({
            userUuid: '',
            weight: orderWight,
            total: total + shipment.price,
            products: orderProducts,
            shipment: orderShipment,
            payment: card,
            threeDSecureProps: {
                ipAddress: deviceInfo?.ipAddress,
                userAgent: deviceInfo?.userAgent,
                device: deviceInfo?.deviceData
            },
        })

        if (res.qrCodeProps) {
            setPix(res.qrCodeProps)
            handlePixModalOpen()
        } else if (res.isValid) {
            handleCreateOrderSuccessfulModalOpen();
        } else {
            handleCreateOrderErrorModalOpen()
        }
    }

    return (
        <div className="bg-white px-2 py-4 mt-4 shadow-sm sm:rounded-lg w-full h-fit">
            <ul role="list" className="divide-y divide-gray-200">
                {items.map((product) => (
                    <li key={product.id} className="flex px-4 py-6 sm:px-6 h-fit ">
                        <div className='flex items-center justify-center'>
                            <p className='pr-4 text-principal'>{product.quantity} X </p>
                        </div>

                        <div className="shrink-0">
                            <Image alt={`Imagem do produto ${product.name}`}
                                   src={product.image ? product.image : ''}
                                   height={50}
                                   width={50}
                                   priority={true}
                                   className="w-auto rounded-lg"
                            />
                        </div>

                        <div className="ml-2 flex flex-1 flex-col justify-between">
                            <div className="flex items-start">
                                <div className="min-w-0 flex-1">
                                    <h4 className="text-md font-medium text-principal">
                                        {product.name}
                                    </h4>
                                </div>


                                <div className="min-w-0 flex-1">
                                    <h4 className="text-md font-medium text-principal text-right">
                                        {formatCentsToBRL(product.price)}
                                    </h4>
                                </div>
                            </div>
                        </div>
                    </li>
                ))}
            </ul>
            <dl className="space-y-6 border-t border-gray-200 px-4 py-6 sm:px-6 divide-y divide-gray-200">
                <div>
                    <div className="flex items-center justify-between">
                        <dt className="text-md text-principal font-semibold">Valor dos produtos</dt>
                        <dd className="text-sm font-medium text-gray-900">{formatCentsToBRL(total)}</dd>
                    </div>
                    <div className="flex items-center justify-between">
                        <dt className="text-md text-principal font-semibold">Envio</dt>
                        <dd className="text-sm font-medium text-gray-900">{formatCentsToBRL(shipment.price)}</dd>
                    </div>
                </div>
                <div className="flex items-center justify-between border-t pt-6">
                    <dt className="text-base text-principal font-semibold">Total</dt>
                    <dd className="text-base font-medium text-gray-900">{formatCentsToBRL(total + shipment.price)}</dd>
                </div>
            </dl>

            <div>
                <SubmitButton label='Efetuar compra' type={'button'} onClick={createOrderRequest}/>
            </div>
            {isSuccessModalOpen && (
                <CreateOrderSuccessfulModal isOpen={isSuccessModalOpen}
                                            onCloseAction={handleCreateOrderSuccessfulModalOpen}/>
            )}
            {isPixModalOpen && (
                <PixModal pixProps={pix} isOpen={isPixModalOpen} onCloseAction={handlePixModalOpen}/>
            )}
            {isErrorModalOpen && (
                <CreateOrderErrorModal isOpen={isErrorModalOpen} onCloseAction={handleCreateOrderErrorModalOpen}/>
            )}
        </div>
    )
}

'use client'

import {PostalCode} from "@/components/Checkout/PostalCode/PostalCode";
import {ValidShipmentDto} from "@/helpers";
import {useCartStore} from "@/store/useCartStore";
import {useCallback, useState} from "react";
import {calculateShipment} from "./actions";

const baseShipmentOption =
    {
        id: 0,
        name: 'Retirada em loja',
        price: '0',
        discount: '0',
        delivery_time: 1,
        company: {
            id: 0,
            name: 'Tuzzy Cards'
        }
    }

export default function CheckoutShippingOptions({errors}: { errors: boolean }) {
    const [loading, setIsLoading] = useState(false)
    const [error, setError] = useState(errors)
    const [shipments, setShipments] = useState<ValidShipmentDto[]>([baseShipmentOption])
    const [boxId, setBoxId] = useState<number>(0)
    const {addShipment, getOrderVolume, getOrderWeight, getCartTotal, shipment} = useCartStore()

    const handleCalculateShipments = useCallback(async (postalCode: string) => {
        setIsLoading(true)
        const volume = getOrderVolume();
        const weight = getOrderWeight();
        const total = getCartTotal()

        const {isValid, validShipment, boxId} = await calculateShipment({volume, weight, total, postalCode})

        if (isValid && validShipment) {
            const newValues = []
            newValues.push(baseShipmentOption)
            validShipment.map((item) => {
                newValues.push(item)
            })

            setShipments(newValues)
            setBoxId(boxId)
            setError(false)
        } else {
            setError(true)
        }
        setIsLoading(false)
    }, [getCartTotal, getOrderVolume, getOrderWeight])

    const handleShipmentChange = (option: { id: number, name: string, price: number, boxId: number }) => {
        addShipment(option);
    }

    return (
        <div
            className="mt-4 w-full rounded-lg border border-gray-200 bg-white shadow-xs flex flex-col justify-between">
            <div className='px-4 py-6 sm:px-6 gap-2'>
                <PostalCode selectPostalCodeAction={handleCalculateShipments} isLoading={loading} error={error}/>
                <p className='text-md my-2'>Escolha o método de envio:</p>
                {shipments.map(shipmentItem => (
                    <div key={shipmentItem.id} className="relative flex items-center">
                        <input
                            id={`${shipmentItem.id}`}
                            onChange={() => handleShipmentChange({
                                price: (Number(shipmentItem.price) - Number(shipmentItem.discount)) * 100,
                                name: shipmentItem.name,
                                id: shipmentItem.id,
                                boxId
                            })}
                            name="plan"
                            type="radio"
                            aria-describedby={`${shipmentItem.id}-description`}
                            className="relative size-4 appearance-none rounded-full border border-gray-300 bg-white before:absolute before:inset-1 before:rounded-full before:bg-white not-checked:before:hidden checked:bg-principal"
                            checked={shipment.id === shipmentItem.id}
                        />
                        <div className="ml-3 text-sm">
                            <label htmlFor={`${shipmentItem.id}`} className="font-medium text-principal">
                                {shipmentItem.name} - {shipmentItem.price === '0' ? 'Grátis' : `R$ ${(Number(shipmentItem.price) - Number(shipmentItem.discount))}`} -
                                Prazo: {shipmentItem.delivery_time === 1 ? `${shipmentItem.delivery_time} dia úteis` : `${shipmentItem.delivery_time} dias úteis`}
                            </label>
                        </div>
                    </div>
                ))}
            </div>
            <h3 className="sr-only">Shipping options</h3>
        </div>
    )
}
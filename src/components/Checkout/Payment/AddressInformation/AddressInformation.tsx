'use client'

import {calculateShipment} from "@/components/Checkout/Payment/AddressInformation/actions";
import {Address, CalculateShipmentDto, ValidShipmentDto} from "@/helpers";
import {useCartStore} from "@/store/useCartStore";
import {formatCentsToBRL} from "@/utils";
import {useCallback, useState} from "react";
import {AddressRegistration} from "./AddressRegistration";
import {AddressSelection} from "./AddressSelection";

interface AddressInformationProps {
    addresses: Address[];
    onUserCreatedAction: () => void;
}

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

export function AddressInformation({addresses, onUserCreatedAction}: AddressInformationProps) {
    const [shipments, setShipments] = useState<ValidShipmentDto[]>([baseShipmentOption])
    const [boxId, setBoxId] = useState<number>(0)
    const [selectedAddress, setSelectedAddress] = useState<Address | null>(null)
    const {getOrderWeight, getOrderVolume, getCartTotal, addShipment, shipment} = useCartStore()

    const handleSelectAddress = async (address: Address) => {
        const volume = getOrderVolume();
        const weight = getOrderWeight();
        const total = getCartTotal()
        setSelectedAddress(address)
        await shipmentData({volume, weight, total, postalCode: address.zipCode})
    }

    const shipmentData = useCallback(async (data: CalculateShipmentDto) => {
        const {volume, weight, total, postalCode} = data
        const {isValid, validShipment, boxId} = await calculateShipment({volume, weight, total, postalCode})

        if (isValid && validShipment) {
            const newValues = []
            newValues.push(baseShipmentOption)
            validShipment.map((item) => {
                newValues.push(item)
            })

            setShipments(newValues)
            setBoxId(boxId)
        }
    }, [])

    const handleShipmentChange = (option: {
        id: number,
        name: string,
        price: number,
        boxId: number,
        addressId: number
    }) => {
        addShipment(option);
    }

    return (
        <div>
            {addresses.length > 0 ? (
                <div>
                    <AddressSelection addresses={addresses} onAddressCreatedAction={onUserCreatedAction}
                                      handleSelectedAddressChangeAction={handleSelectAddress}/>
                    {shipments.length > 1 && (
                        <div className='bg-white px-6 py-4 mt-4 shadow-sm sm:rounded-lg sm:px-12'>
                            <p className='text-md my-2'>Escolha o método de envio:</p>
                            {shipments.map(shipmentItem => (
                                <div key={shipmentItem.id} className="relative flex items-center">
                                    <input
                                        id={`${shipmentItem.id}`}
                                        onChange={() => handleShipmentChange({
                                            price: Number(shipmentItem.price) * 100,
                                            name: shipmentItem.name,
                                            id: shipmentItem.id,
                                            boxId,
                                            addressId: selectedAddress?.id ? selectedAddress.id : 0,
                                        })}
                                        name="plan"
                                        type="radio"
                                        aria-describedby={`${shipmentItem.id}-description`}
                                        className="relative size-4 appearance-none rounded-full border border-gray-300 bg-white before:absolute before:inset-1 before:rounded-full before:bg-white not-checked:before:hidden checked:bg-principal"
                                        checked={shipment.id === shipmentItem.id}
                                    />
                                    <div className="ml-3 text-sm">
                                        <label htmlFor={`${shipmentItem.id}`} className="font-medium text-principal">
                                            {shipmentItem.name} - {shipmentItem.price === '0' ? 'Grátis' : `R$ ${formatCentsToBRL(Number(shipmentItem.price) * 100)}`} -
                                            Prazo: {shipmentItem.delivery_time === 1 ? `${shipmentItem.delivery_time} dia úteis` : `${shipmentItem.delivery_time} dias úteis`}
                                        </label>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            ) : (
                <AddressRegistration onUserCreatedAction={onUserCreatedAction}/>
            )}
        </div>
    );
}
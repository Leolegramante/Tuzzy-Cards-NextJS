import {useCartStore} from "@/store/useCartStore";

const shipmentOptions = [
    {
        id: '1',
        name: 'Retirar em loja - grátis',
        price: 0,
    },
]

export default function CheckoutShippingOptions() {
    const {addShipment} = useCartStore()
    return (
        <div
            className="mt-4 w-full rounded-lg border border-gray-200 bg-white shadow-xs flex flex-col justify-between">
            <div className='px-4 py-6 sm:px-6'>
                <p className='text-md'>Escolha o método de envio:</p>
                {shipmentOptions.map(option => (
                    <div key={option.id} className="relative flex items-center mt-3">
                        <div className="flex h-6 items-center">
                            <input
                                onChange={() => addShipment({price: option.price, name: option.name, id: option.id})}
                                id={option.id}
                                name="plan"
                                type="radio"
                                aria-describedby={`${option.id}-description`}
                                className="relative size-4 appearance-none rounded-full border border-gray-300 bg-white before:absolute before:inset-1 before:rounded-full before:bg-white not-checked:before:hidden checked:bg-principal"
                            />
                        </div>
                        <div className="ml-3 text-sm">
                            <label htmlFor={option.id} className="font-medium text-principal">
                                {option.name}
                            </label>
                        </div>
                    </div>
                ))}
            </div>
            <h3 className="sr-only">Shipping options</h3>
        </div>
    )
}
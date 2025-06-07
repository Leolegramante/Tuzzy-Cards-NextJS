import {AddressAccordion} from "@/components/Checkout/Payment/AddressInformation/AddressAccordion";
import {Address} from "@/helpers";

interface AddressSelectionProps {
    addresses: Address[];
    onAddressCreated: () => void
}

export function AddressSelection({addresses, onAddressCreated}: AddressSelectionProps) {
    return (
        <div>
            <div className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Endereço de entrega</h2>
                <p className="text-gray-600">Escolha o endereço que deseja receber sua compra</p>
            </div>

            {addresses.map((address: Address) => (
                <div key={address.id} className="relative flex items-start py-2">
                    <div className="flex h-6 items-center">
                        <input
                            defaultChecked={address.isDefault}
                            id={`${address.id}`}
                            name='address'
                            type="radio"
                            value={address.id}
                            aria-describedby={`${address.id}-description`}
                            className="relative size-4 appearance-none rounded-full border border-gray-300 bg-white before:absolute before:inset-1 before:rounded-full before:bg-white not-checked:before:hidden checked:bg-principal cursor-pointer"
                        />
                    </div>
                    <div className="ml-3 text-sm/6">
                        <label htmlFor={`${address.id}`} className="font-medium text-gray-900">
                            {address.street} {address.number},
                        </label>
                        <span id={`${address.id}-description`} className="text-gray-500">
                             {address.complement.length > 0 ? ` ${address.complement}, ` : ' '} {address.city} - {address.state} - {address.zipCode}
                        </span>
                    </div>
                </div>
            ))}
            <AddressAccordion onAddressCreatedAction={onAddressCreated}/>
        </div>
    );
}
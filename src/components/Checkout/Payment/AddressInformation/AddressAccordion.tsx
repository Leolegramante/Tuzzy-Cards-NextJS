'use client'

import {AddressRegistration} from "@/components/Checkout/Payment/AddressInformation/AddressRegistration";
import {useCallback, useState} from "react";

interface AddressAccordionProps {
    onAddressCreatedAction?: () => void; // Callback opcional do componente pai
}

export function AddressAccordion({onAddressCreatedAction}: AddressAccordionProps) {
    const [isAddingAddress, setIsAddingAddress] = useState<boolean>(false);

    const handleToggleAddAddress = useCallback(() => {
        setIsAddingAddress((prevState) => !prevState);
    }, []);

    const handleCreateAction = useCallback(() => {
        // Força a atualização do estado
        setIsAddingAddress(false);

        // Chama o callback do componente pai após um pequeno delay
        // para garantir que o estado foi atualizado
        setTimeout(() => {
            if (onAddressCreatedAction) {
                onAddressCreatedAction();
            }
        }, 0);
    }, [onAddressCreatedAction]);

    return (
        <>
            <div className='pt-4 border-t mt-4'>
                <button
                    type="button"
                    onClick={handleToggleAddAddress}
                    className='flex items-center justify-between w-full gap-2 text-principal font-bold hover:text-principal/80 transition-colors rounded-md p-1'
                    aria-expanded={isAddingAddress}
                    aria-controls="address-form-content"
                >
                    {isAddingAddress ? 'Cancelar novo endereço' : 'Deseja cadastrar um novo endereço?'}
                    <svg
                        className={`w-5 h-5 transition-transform duration-200 ${isAddingAddress ? 'rotate-180' : ''}`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        aria-hidden="true"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7"/>
                    </svg>
                </button>
            </div>

            {isAddingAddress && (
                <div
                    id="address-form-content"
                    className="overflow-hidden transition-all duration-300 ease-in-out max-h-[600px] opacity-100"
                    aria-hidden={false}
                >
                    <div className='pb-2'>
                        <AddressRegistration
                            onUserCreatedAction={handleCreateAction}
                            className={'sm:px-2 mt-0'}
                        />
                    </div>
                </div>
            )}
        </>
    );
}
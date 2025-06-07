'use client'

import {SubmitButton, ZipCodeInput} from "@/components";
import {AddressSearchDto} from "@/helpers";
import {useRef, useState} from "react";
import {getAddressFromZipCode} from "./actions";
import {AddressForm} from "./AddressForm/AddressForm";

interface AddressRegistrationProps {
    onUserCreatedAction: () => void;
    className?: string
}

export function AddressRegistration({onUserCreatedAction, className = ''}: AddressRegistrationProps) {
    const formRef = useRef<HTMLFormElement>(null);
    const [userAddress, setUserAddress] = useState<AddressSearchDto | null>(null);
    const [isLoading, setIsloading] = useState<boolean>(false);

    const getAddress = async (e: React.FormEvent) => {
        e.preventDefault(); // ✅ Previne o recarregamento da página

        const formData = new FormData(formRef.current as HTMLFormElement);
        const zipCode = formData.get("zipCode") as string;

        setIsloading(true);
        const {address, isValid} = await getAddressFromZipCode(zipCode);

        if (isValid && address) {
            setUserAddress(address);
        }
        setIsloading(false);
        console.log(userAddress)
    };

    return (
        <div className={`w-full bg-white px-6 py-4 mt-4 sm:rounded-lg sm:px-12 ${className}`}>
            <p className='text-principal text-lg font-bold'>Cadastre um endereço de entrega</p>
            <form ref={formRef} onSubmit={getAddress}>
                <div className='flex items-center justify-between'>
                    <ZipCodeInput label='CEP' placeholder='13468-370'/>
                    <SubmitButton
                        name='searchAddress'
                        type='submit'
                        label='Pesquisar'
                        className='mt-5 w-20'
                        isLoading={isLoading}
                    />
                </div>
            </form>
            {userAddress && (
                <AddressForm
                    key={userAddress.cep}
                    userAddress={userAddress}
                    onCreateAction={onUserCreatedAction}
                />
            )}
        </div>
    );
}
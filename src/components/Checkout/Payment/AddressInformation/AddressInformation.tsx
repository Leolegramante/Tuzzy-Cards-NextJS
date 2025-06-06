'use client'

import {SubmitButton, ZipCodeInput} from "@/components";
import {Address, AddressSearchDto} from "@/helpers";
import {useRef, useState} from "react";
import {getAddressFromZipCode} from "./actions";
import {AddressForm} from "./AddressForm/AddressForm";

interface AddressInformationPops {
    addresses: Address[]
}

export function AddressInformation({addresses}: AddressInformationPops) {
    const formRef = useRef<HTMLFormElement>(null);
    const [userAddress, setUserAddress] = useState<AddressSearchDto | null>(null)

    const getAddress = async () => {
        const formData = new FormData(formRef.current as HTMLFormElement)
        const zipCode = formData.get("zipCode") as string;
        const {address, isValid} = await getAddressFromZipCode(zipCode);
        console.log(address)
        if (isValid && address) {
            setUserAddress(address)
        }
    }

    return (
        <div>
            {addresses.length > 0 ? (
                <div className='bg-white px-6 py-4 mt-4 shadow-sm sm:rounded-lg sm:px-12'>Tem</div>
            ) : (
                <div className='w-full bg-white px-6 py-4 mt-4 shadow-sm sm:rounded-lg sm:px-12'>
                    <p className='text-principal text-lg'>Cadastre um endereço de entrega</p>
                    <div className='flex items-center justify-between'>
                        <ZipCodeInput label='CEP' placeholder='13468-370'/>
                        <SubmitButton name='searchAddress' type='button' label='Pesquisar' className='mt-5 w-20'
                                      onClick={async () => await getAddress()}/>
                    </div>
                    {userAddress && (<AddressForm userAddress={userAddress}/>)}
                </div>
            )}
        </div>
    );
}
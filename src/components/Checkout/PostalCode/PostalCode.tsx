'use client'

import {SubmitButton} from "@/components";
import {useState} from 'react';

type PostalCodeProps = {
    error: boolean
    isLoading: boolean
    selectPostalCodeAction: (postalCode: string) => void;
}

export const PostalCode = ({selectPostalCodeAction, isLoading, error}: PostalCodeProps) => {
    const [postalCode, setPostalCode] = useState('');

    const formatPostalCode = (value: string) => {
        // Remove tudo que não for número
        const numbers = value.replace(/\D/g, '');

        // Limita a 8 dígitos
        const limitedNumbers = numbers.slice(0, 8);

        // Aplica a máscara 00000-000
        if (limitedNumbers.length <= 5) {
            return limitedNumbers;
        } else {
            return `${limitedNumbers.slice(0, 5)}-${limitedNumbers.slice(5)}`;
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const formattedValue = formatPostalCode(e.target.value);
        setPostalCode(formattedValue);
    };

    return (
        <div>
            <p>Digite o CEP de entrega:</p>
            <div className='flex items-center w-full mt-2'>
                <input
                    type='text'
                    value={postalCode}
                    onChange={handleInputChange}
                    placeholder='00000-000'
                    maxLength={9}
                    className='h-10 border border-principal px-2 rounded-l-xl text-principal'
                />
                <SubmitButton
                    isLoading={isLoading}
                    onClick={() => selectPostalCodeAction(postalCode)}
                    className='h-10 cursor-pointer px-4 border border-principal rounded-l-none rounded-r-xl bg-principal text-gray-50 hover:bg-gray-50 hover:text-principal w-fit'>
                    Calcular
                </SubmitButton>
            </div>
            {error && (
                <p className='text-red-500 mt-1'>Erro ao consultar frete, tente novamente</p>
            )}
        </div>
    )
}
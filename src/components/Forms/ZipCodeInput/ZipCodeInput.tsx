import {cn} from "@/helpers/cs";
import React from "react";

export type TextInputProps = React.ComponentProps<"input"> & {
    type?: string | null;
    label?: string | null;
    error?: string | null;
    disabled?: boolean;
};

export function ZipCodeInput({label, disabled = false, className, error, ...props}: TextInputProps) {
    const formatZipCode = (value: string) => {
        const numbers = value.replace(/\D/g, '');

        const limitedNumbers = numbers.slice(0, 8);

        if (limitedNumbers.length <= 5) {
            return limitedNumbers;
        } else {
            return `${limitedNumbers.slice(0, 5)}-${limitedNumbers.slice(5)}`;
        }
    };

    const handleZipCodeInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const formattedValue = formatZipCode(e.target.value);
        const input = e.target
        input.value = formattedValue;
    }

    return (
        <div className={cn("my-2", className)}>
            {label ? <label className="block text-sm font-semibold text-principal">{label}</label> : null}
            <input
                id='zipCode'
                type='text'
                name='zipCode'
                formNoValidate
                className={cn(
                    "block w-full rounded-md bg-white px-3 py-1.5 font-normal text-principal ring-2 ring-inset ring-principal placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-fy sm:text-sm/6 disabled:opacity-50 disabled:cursor-not-allowed",
                    {
                        "ring-red-500 focus:ring-red-500": !!error,
                    }
                )}
                onChange={handleZipCodeInputChange}
                disabled={disabled}
                {...props}
            />
            {error ? (
                <div>
                    <small className="text-sm font-semibold text-red-500">{error}</small>
                </div>
            ) : null}
        </div>
    );
}
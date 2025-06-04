import {cn} from "@/helpers/cs";
import {FormEvent} from "react";

export type TextInputProps = React.ComponentProps<"input"> & {
    label?: string | null;
    error?: string | null;
    disabled?: boolean;
};

export function ProductSizeInput({
                                     label,
                                     name,
                                     disabled = false,
                                     className,
                                     error,
                                     defaultValue,
                                     ...props
                                 }: TextInputProps) {
    const formatMmToCm = (value: string, minDigits: number = 3) => {
        const mmNumbers = value.replace(/\D/g, '');
        if (!mmNumbers) return '';
        const paddedMm = mmNumbers.padStart(minDigits, '0');
        const mmValue = parseInt(paddedMm);
        const cmValue = mmValue / 10;
        return cmValue.toFixed(1).replace('.', ',');
    };

    const handleInput = (e: FormEvent<HTMLInputElement>): void => {
        const input = e.currentTarget;
        input.value = formatMmToCm(input.value, 2);
    };

    return (
        <div className={cn("my-2", className)}>
            {label ? <label className="block text-sm font-semibold text-principal">{label}</label> : null}
            <div className={cn(
                "flex rounded-md bg-white px-3 py-1.5 font-normal text-principal ring-2 ring-inset ring-principal placeholder:text-gray-400 focus-within:ring-2 focus-within:ring-inset focus-within:ring-fy sm:text-sm/6 border-2 border-transparent disabled:opacity-50 disabled:cursor-not-allowed ",
                {
                    "ring-red-500 focus-within:ring-red-500": !!error,
                }
            )}>
                <input
                    id={name}
                    type='text'
                    name={name}
                    placeholder="35,5"
                    formNoValidate
                    maxLength={6}
                    onInput={handleInput}
                    disabled={disabled}
                    defaultValue={formatMmToCm(String(defaultValue), 2)}
                    className='w-full focus:outline-none'
                    {...props}
                />
                <p>cm</p>
            </div>
            {error ? (
                <div>
                    <small className="text-sm font-semibold text-red-500">{error}</small>
                </div>
            ) : null}
        </div>
    );
}
import {cn} from "@/helpers/cs";
import {FormEvent} from "react";

export type TextInputProps = React.ComponentProps<"input"> & {
    label?: string | null;
    error?: string | null;
    disabled?: boolean;
};

export function PhoneInput({label, name, disabled = false, className, error, ...props}: TextInputProps) {
    const formatPhone = (value: string): string => {
        const digits = value.replace(/\D/g, '');

        if (digits.length <= 2) return `(${digits}`;
        if (digits.length <= 6) return `(${digits.slice(0, 2)}) ${digits.slice(2)}`;
        if (digits.length <= 10)
            return `(${digits.slice(0, 2)}) ${digits.slice(2, 6)}-${digits.slice(6)}`;
        return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7, 11)}`;
    }

    const handleInput = (e: FormEvent<HTMLInputElement>): void => {
        const input = e.currentTarget;
        input.value = formatPhone(input.value);
    };

    return (
        <div className={cn("my-2", className)}>
            {label ? <label className="block text-sm font-semibold text-principal">{label}</label> : null}
            <input
                id="phone"
                type='text'
                name={name}
                placeholder="(00) 00000-0000"
                formNoValidate
                maxLength={15}
                onInput={handleInput}
                className={cn(
                    "block w-full rounded-md bg-white px-3 py-1.5 font-normal text-principal outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-fy sm:text-sm/6 border-2 border-transparent disabled:opacity-50 disabled:cursor-not-allowed",
                    {
                        "border-red-500": !!error,
                    }
                )}
                {...props}
                disabled={disabled}
            />
            {error ? (
                <div>
                    <small className="text-sm font-semibold text-red-500">{error}</small>
                </div>
            ) : null}
        </div>
    );
}
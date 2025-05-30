import {cn} from "@/helpers/cs";
import {FormEvent} from "react";

export type TextInputProps = React.ComponentProps<"input"> & {
    label?: string | null;
    error?: string | null;
    disabled?: boolean;
};

export function CPFInput({label, name, disabled = false, className, error, ...props}: TextInputProps) {
    const formatCPF = (value: string) => {
        const cpfNumbers = value.replace(/\D/g, '');
        return cpfNumbers
            .replace(/(\d{3})(\d)/, '$1.$2')
            .replace(/(\d{3})(\d)/, '$1.$2')
            .replace(/(\d{3})(\d{1,2})$/, '$1-$2');
    };

    const handleInput = (e: FormEvent<HTMLInputElement>): void => {
        const input = e.currentTarget;
        input.value = formatCPF(input.value);
    };

    return (
        <div className={cn("my-2", className)}>
            {label ? <label className="block text-sm font-semibold text-principal">{label}</label> : null}
            <input
                id="cpf"
                type='text'
                name={name}
                placeholder="000.000.000-00"
                formNoValidate
                maxLength={14}
                onInput={handleInput}
                className={cn(
                    "block w-full rounded-md bg-white px-3 py-1.5 font-normal text-principal outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-fy sm:text-sm/6 border-2 border-transparent disabled:opacity-50 disabled:cursor-not-allowed",
                    {
                        "border-red-500": !!error,
                    }
                )}
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
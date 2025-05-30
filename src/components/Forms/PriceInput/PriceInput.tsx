import {FormEvent} from "react";

export type PriceInputProps = React.ComponentProps<"input"> & {
    label?: string | null;
    error?: string | null;
};

export function PriceInput({label, error, ...props}: PriceInputProps) {
    function formatMoneyInput(value: string): string {
        const digits = value.replace(/\D/g, '');

        const cents = digits.padStart(3, '0');
        const int = cents.slice(0, -2);
        const decimal = cents.slice(-2);

        const intWithSeparator = Number(int).toLocaleString('pt-BR');
        return `R$ ${intWithSeparator},${decimal}`;
    }

    const handleInput = (e: FormEvent<HTMLInputElement>): void => {
        const input = e.currentTarget;
        input.value = formatMoneyInput(input.value);
    };

    return (
        <div className='max-w-[224px]'>
            {label ? <label className="block text-sm font-semibold text-principal">{label}</label> : null}
            <div>
                <div
                    className="flex items-center rounded-md bg-white px-3 ring-2 ring-inset ring-principal focus-within:ring-2 focus-within:ring-inset focus-within:ring-fy h-10">
                    <input
                        id="price"
                        name="price"
                        type='text'
                        placeholder="R$ 0,00"
                        onInput={handleInput}
                        maxLength={20}
                        aria-describedby="price-currency"
                        className="block min-w-0 grow py-1.5 pr-3 pl-2 text-base text-principal placeholder:text-gray-400 focus:outline-none sm:text-sm/6"
                        {...props}
                    />
                    <div id="price-currency" className="shrink-0 text-base text-principal select-none sm:text-sm/6">
                        BRL
                    </div>
                </div>
            </div>
            {error ? (
                <div className='mt-2'>
                    <small className="text-sm font-semibold text-red-500">{error}</small>
                </div>
            ) : null}
        </div>
    )
}
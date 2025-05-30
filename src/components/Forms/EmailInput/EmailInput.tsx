import {cn} from "@/helpers/cs";

export type EmailInputProps = React.ComponentProps<"input"> & {
    label?: string | null;
    error?: string | null;
};

export function EmailInput({label, name, className, error, ...props}: EmailInputProps) {
    return (
        <div className={cn("my-2", className)}>
            {label ? <label className="block text-sm font-semibold text-principal">{label}</label> : null}
            <input
                id="email"
                type="email"
                name={name}
                formNoValidate
                autoComplete="email"
                className={cn(
                    "block w-full rounded-md bg-white px-3 py-1.5 font-normal text-principal ring-2 ring-inset ring-principal placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-fy sm:text-sm/6 border-2 border-transparent",
                    {
                        "ring-red-500 focus:ring-red-500": !!error,
                    }
                )}
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
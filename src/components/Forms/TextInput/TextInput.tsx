import {cn} from "@/helpers/cs";
import React from "react";

export type TextInputProps = React.ComponentProps<"input"> & {
    type?: string | null;
    label?: string | null;
    error?: string | null;
    disabled?: boolean;
};

export function TextInput({label, type = 'text', name, disabled = false, className, error, ...props}: TextInputProps) {
    return (
        <div className={cn("my-2", className)}>
            {label ? <label className="block text-sm font-semibold text-principal">{label}</label> : null}
            <input
                id={name}
                type={type}
                name={name}
                formNoValidate
                className={cn(
                    "block w-full rounded-md bg-white px-3 py-1.5 font-normal text-principal ring-2 ring-inset ring-principal placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-fy sm:text-sm/6 disabled:opacity-50 disabled:cursor-not-allowed",
                    {
                        "ring-red-500 focus:ring-red-500": !!error,
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
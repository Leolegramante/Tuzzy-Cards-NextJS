import {Spinner} from "@/components";
import {cn} from "@/helpers/cs";
import React from "react";

export type SubmitButtonProps = React.ComponentProps<"button"> & {
    label?: string | null;
    isLoading?: boolean;
};

export function SubmitButton({
                                 label,
                                 children,
                                 className,
                                 isLoading,
                                 type = 'submit',
                                 ...props
                             }: SubmitButtonProps) {
    return (
        <button
            type={type}
            className={cn(
                "text-gray-50transition-colors inline-flex w-full justify-center rounded-lg bg-principal px-3 py-2 text-sm font-semibold cursor-pointer text-gray-50 hover:bg-fy active:bg-fy active:text-gray-50 disabled:opacity-50 disabled:pointer-events-none",
                className
            )}
            disabled={isLoading}
            {...props}
        >
            {isLoading ? <Spinner className="mr-2"/> : null}
            {isLoading ? "" : label || children}
        </button>
    );
}
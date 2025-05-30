import {cn} from "@/helpers/cs";

export type TextAreaProps = React.ComponentProps<"textarea"> & {
    label?: string | null;
    error?: string | null;
    rows?: number;
};

export function TextArea({label, error, rows = 6, ...props}: TextAreaProps) {
    return (
        <div className="my-2">
            {label ? <label className="block text-sm font-semibold text-principal">{label}</label> : null}
            <textarea
                rows={rows}
                className={cn(
                    "block w-full rounded-md bg-white px-3 py-1.5 font-normal text-principal ring-2 ring-inset ring-principal placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-fy sm:text-sm/6 border-2 border-transparent resize-none",
                    {
                        "ring-red-500 focus:ring-red-500": !!error,
                    }
                )}
                defaultValue={''}
                {...props}
            />
            {error ? (
                <div>
                    <small className="text-sm font-semibold text-red-500">{error}</small>
                </div>
            ) : null}
        </div>
    )
}
import {Spinner} from '@/components'
import {cn} from "@/helpers/cs";

export type SubmitButtonProps = React.ComponentProps<'button'> & {
    label?: string | null
    isLoading?: boolean
}

export function CancelButton({label, children, className, isLoading, ...props}: SubmitButtonProps) {
    return (<button
            type="button"
            className={cn('text-gray-50transition-colors mt-8 inline-flex w-full justify-center rounded-lg bg-white px-3 py-2 text-sm font-semibold text-red-500 hover:bg-red-500 hover:text-gray-50 cursor-pointer', className)}
            disabled={isLoading}
            {...props}
        >
            {isLoading ? <Spinner className="mr-2"/> : null}
            {isLoading ? '' : label || children}
        </button>
    )
}

interface PageHeadingsProps {
    label: string;
    button?: boolean;
    buttonLabel?: string;
    buttonOnClick?: () => void;
}

export function PageHeadings({label, button = false, buttonLabel, buttonOnClick}: PageHeadingsProps) {
    return (
        <div className="md:flex md:items-center md:justify-between">
            <div className="min-w-0 flex-1">
                <h2 className="text-2xl/7 font-bold text-principal sm:truncate sm:text-3xl sm:tracking-tight">
                    {label}
                </h2>
            </div>
            <div className="mt-4 flex md:mt-0 md:ml-4">
                {button && (
                    <button
                        type="button"
                        className="text-gray-50transition-colors inline-flex w-full justify-center rounded-lg bg-principal px-3 py-2 text-sm font-semibold cursor-pointer text-gray-50 hover:bg-fy active:bg-fy active:text-gray-50 disabled:opacity-50 disabled:pointer-events-none"
                        onClick={buttonOnClick}
                    >
                        {buttonLabel ? buttonLabel : 'Cadastrar'}
                    </button>
                )}
            </div>
        </div>
    )
}
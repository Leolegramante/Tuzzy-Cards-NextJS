export function LoadingData() {
    return (
        <div className="flex min-h-[400px] min-w-full py-2 align-middle sm:px-6 lg:px-8 items-center justify-center">
            <div className="flex flex-col">
                <h1 className="text-2xl/7 font-bold text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
                    Carregando dados
                </h1>
                <p className="text-sm font-medium text-gray-500">Por favor aguarde.</p>
            </div>
        </div>
    );
}
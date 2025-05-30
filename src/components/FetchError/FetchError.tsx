export function FetchError() {
    return (
        <div className="flex min-h-[400px] min-w-full py-2 align-middle sm:px-6 lg:px-8 items-center justify-center">
            <div className="flex flex-col">
                <h1 className="text-2xl/7 font-bold text-principal sm:truncate sm:text-3xl sm:tracking-tight">
                    Desculpe, ocorreu um erro ao carregar as informações.
                </h1>
                <p className="text-md font-medium text-gray-500">
                    Tente novamente mais tarde
                </p>
            </div>
        </div>
    );
}
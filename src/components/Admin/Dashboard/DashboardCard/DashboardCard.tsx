type DashboardCardProps = {
    name: string
    count: number | string
}

export const DashboardCard = ({name, count}: DashboardCardProps) => {
    return (
        <div className='w-full h-fit overflow-hidden rounded-lg bg-white shadow-sm flex justify-center items-center'>
            <div className="px-4 py-5 sm:p-6 flex flex-col items-center justify-center">
                <h3 className=" font-medium text-principal">
                    {name}
                </h3>
                {typeof count === 'string' ? <p className="mt-8 text-lg text-principal font-bold">
                    {count}
                </p> : <p className="mt-8 text-lg text-principal font-bold">
                    {count}
                </p>
                }

            </div>
        </div>
    )
}
'use client'

import {AdminDashboard, AdminOptionsSidebar, Boxes, Breadcrumbs, Orders, UsersAdminTable} from "@/components";
import {useParams, useSearchParams} from "next/navigation";
import {useState} from 'react'

interface activeComponent {
    itemName: string,
    subItemName: string | null,
}

const pages = [
    {name: 'Dashboard Administrativo', href: '/admin/dashboard', current: true},
]

const AdminDashboardPage = () => {
    const {option} = useParams<{ option: string }>()
    const searchParams = useSearchParams()
    const page = searchParams.get('page')
    const limit = searchParams.get('limit')

    const currentPage = Number(page) || 1;
    const searchLimit = Number(limit) || 10;

    const [active, setActive] = useState<activeComponent>({itemName: option, subItemName: null})
    return (<>
        <div className="w-full h-full px-4 py-2 bg-gray-100 min-h-[900px]">
            <div className='pl-2 flex flex-col gap-y-2'>
                <Breadcrumbs pages={pages}/>
                <h2 className="text-2xl/7 font-bold text-principal sm:truncate sm:text-3xl sm:tracking-tight">
                    Dashboard administrativo
                </h2>
            </div>
            <div className="grid grid-cols-4 grid-rows-1 gap-2">
                <div className="flex p-px col-span-1">
                    <AdminOptionsSidebar pageValue={setActive} itemName={active.itemName}
                                         subItemName={active.subItemName ? active.subItemName : undefined}/>
                </div>
                <div className="flex p-px col-span-3">
                    {option === 'dashboard' && (
                        <AdminDashboard/>
                    )}
                    {option === 'users' && (
                        <UsersAdminTable currentPage={currentPage} limit={searchLimit}/>
                    )}
                    {option === 'orders' && (
                        <Orders/>
                    )}
                    {option === 'boxes' && (
                        <Boxes currentPage={currentPage} limit={searchLimit}/>
                    )}
                </div>
            </div>

        </div>
    </>)
}

export default AdminDashboardPage;
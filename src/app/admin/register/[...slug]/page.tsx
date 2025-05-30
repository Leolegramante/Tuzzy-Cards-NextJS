'use client'

import {AdminProductsSidebar, Breadcrumbs, Categories, Products, SubCategories} from "@/components";
import {useParams, useSearchParams} from "next/navigation";

const pages = [
    {name: 'Dashboard Administrativo', href: '/admin/dashboard', current: true},
    {name: 'Cadastro de produtos', href: '/admin/register/products', current: true},
]

export default function AdminProductsPage() {
    const {slug} = useParams<{ slug: string[] }>()

    const searchParams = useSearchParams()
    const page = searchParams.get('page')
    const limit = searchParams.get('limit')

    const itemName = slug[0] ? slug[0] : undefined
    const subItemName = slug[1] ? slug[1] : undefined
    const currentPage = Number(page) || 1;
    const searchLimit = Number(limit) || 10;

    return (<>
        <div className="w-full h-full px-4 py-2 bg-gray-100 min-h-[900px]">
            <div className='pl-2 flex flex-col gap-y-2'>
                <Breadcrumbs pages={pages}/>
                <h1 className="text-principal text-2xl font-bold mb-2">Cadastro de produtos</h1>
            </div>
            <div className="grid grid-cols-6 grid-rows-1 gap-2">
                <div className="flex p-px col-span-2">
                    <AdminProductsSidebar itemName={itemName} subItemName={subItemName}/>
                </div>
                <div className="flex p-px col-span-4">
                    {itemName == 'products' && (<Products currentPage={currentPage} limit={searchLimit}/>)}
                    {itemName == 'configuration' && subItemName === 'categories' && (
                        <Categories currentPage={currentPage} limit={searchLimit}/>)}
                    {itemName == 'configuration' && subItemName === 'sub-categories' && (
                        <SubCategories currentPage={currentPage} limit={searchLimit}/>)}
                </div>
            </div>
        </div>
    </>)
}

'use client'

import {Breadcrumbs, FetchError, LoadingData, PageContainer, ProductsGrid} from "@/components";
import {useSearchParams} from "next/navigation";
import {useEffect, useState} from "react";
import {GetProducts, GetProductsResponse} from './actions'

const pages = [
    {name: 'Todos os produtos', href: '/products', current: true},
]

const ProductsPage = () => {
    const [products, setProducts] = useState<GetProductsResponse>({products: [], total: 0, totalPages: 0})
    const [isloading, setisloading] = useState<boolean>(false)
    const [error, setError] = useState<boolean>(false)
    const searchParams = useSearchParams()
    const page = Number(searchParams.get('page')) || 1
    const searchLimit = Number(searchParams.get('limit')) || 12
    const sortBy = searchParams.get('orderBy') || 'createdAt'
    const order = searchParams.get('order') || 'desc'
    const categoryIds = searchParams.get('categoryIds') || ''
    const subCategoryIds = searchParams.get('subCategoryIds') || ''
    const inStock = searchParams.get('inStock') || undefined;

    useEffect(() => {
        setisloading(true)
        const fetchData = () => {
            return GetProducts({page, limit: searchLimit, sortBy, order, categoryIds, subCategoryIds, inStock})
        }
        fetchData().then((data) => {
            if (data) {
                setProducts(data)
                setisloading(false)
            }
        }).catch(() => {
            setisloading(false)
            setError(true)
        })
    }, [categoryIds, inStock, order, page, searchLimit, sortBy, subCategoryIds]);

    return (
        <PageContainer>
            <div className='pl-2 flex flex-col gap-y-2'>
                <Breadcrumbs pages={pages}/>
                <h1 className="text-principal text-2xl font-bold mb-2">Todos os produtos</h1>
                {error && !isloading && (<FetchError/>)}
                {isloading && (<LoadingData/>)}
                {!isloading && !error && (
                    <ProductsGrid products={products.products} totalPages={products.totalPages}
                                  currentPage={page} totalProducts={products.total}/>
                )}
            </div>
        </PageContainer>
    )
}

export default ProductsPage;
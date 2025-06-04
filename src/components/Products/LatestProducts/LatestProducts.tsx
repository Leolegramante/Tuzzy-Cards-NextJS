'use client'

import {FetchError, LoadingData, SectionTitle} from "@/components";
import {ProductsCarousel} from "@/components/Products/ProductsCarousel/ProductsCarousel";
import {ProductDto} from "@/helpers";
import {useEffect, useState} from "react";
import {getLatestProducts} from "./actions";

export function LatestProducts() {
    const [products, setProducts] = useState<ProductDto[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [isMobile, setIsMobile] = useState(false);

    const fetchData = async () => {
        return await getLatestProducts()
    }

    useEffect(() => {
        setLoading(true)
        fetchData().then((res) => {
            if (!res) {
                setLoading(false)
                setError(true)
            } else {
                setProducts(res)
                setLoading(false)
            }

        })
    }, []);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 640);
        }
        handleResize();

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        <div className='flex flex-col items-center w-full pt-6 mx-auto divide-y divide-principal gap-4'>
            <SectionTitle title='Novos produtos' link='/products'
                          linkText='Veja todos os novos produtos'/>
            {loading && (
                <LoadingData/>
            )}
            {!loading && error && (
                <FetchError/>
            )}
            {!loading && !error && products.length > 0 && (
                <ProductsCarousel products={products} isMobile={isMobile}/>
            )}
        </div>
    );
}
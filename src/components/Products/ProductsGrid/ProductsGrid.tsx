'use client';

import {Pagination} from "@/components";
import {ProductCard} from "@/components/Products/ProductCard/ProductCard";
import {ProductDto} from "@/helpers";
import {useEffect, useState} from "react";

type ProductsGridProps = {
    products: ProductDto[]
    totalPages: number;
    currentPage: number;
    totalProducts: number;
}

export const ProductsGrid = ({products, totalProducts, totalPages, currentPage}: ProductsGridProps) => {
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 640);
        }
        handleResize();

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const mainSize = isMobile ? 150 : 300;

    return (
        <>
            <div className='grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 min-h-[340px] lg:min-h-[470px]'>
                {products.map(product => (
                    <ProductCard product={product} mainSize={mainSize} key={product.id}/>
                ))}

            </div>
            <div className="mt-4 pt-4 border border-transparent border-t-principal">
                <Pagination totalPages={totalPages} currentPage={currentPage} totalItems={totalProducts}
                            limit={currentPage * 10}
                            label='produtos'/>
            </div>
        </>
    )
}
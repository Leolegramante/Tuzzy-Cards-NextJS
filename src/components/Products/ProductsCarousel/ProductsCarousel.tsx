'use client';

import {ProductCard} from "@/components/Products/ProductCard/ProductCard";
import {ProductDto} from "@/helpers";
import {cn} from "@/helpers/cs";
import {ChevronLeftIcon, ChevronRightIcon} from "@heroicons/react/24/solid";
import {useCallback, useEffect, useRef, useState} from "react";

interface ProductsCarouselProps {
    products: ProductDto[];
    isMobile?: boolean;
}

export function ProductsCarousel({products, isMobile}: ProductsCarouselProps) {
    const [activeIndex, setActiveIndex] = useState(0);
    const intervalRef = useRef<NodeJS.Timeout | null>(null);

    const numSideProducts = isMobile ? 1 : 2;

    const prevIndices = Array.from({length: numSideProducts}, (_, i) =>
        (activeIndex - (numSideProducts - i) + products.length) % products.length
    );

    const nextIndices = Array.from({length: numSideProducts}, (_, i) =>
        (activeIndex + i + 1) % products.length
    );

    const resetInterval = useCallback(() => {
        if (intervalRef.current) clearInterval(intervalRef.current);
        intervalRef.current = setInterval(() => {
            setActiveIndex((prev) => (prev + 1) % products.length);
        }, 5000);
    }, [products.length]);

    const goToNext = useCallback(() => {
        setActiveIndex((prev) => (prev + 1) % products.length);
        resetInterval();
    }, [products.length, resetInterval]);

    const goToPrev = useCallback(() => {
        setActiveIndex((prev) => (prev - 1 + products.length) % products.length);
        resetInterval();
    }, [products.length, resetInterval]);

    const goToIndex = (index: number) => {
        setActiveIndex(index);
        resetInterval();
    };

    useEffect(() => {
        resetInterval();
        return () => {
            if (intervalRef.current) clearInterval(intervalRef.current);
        };
    }, [resetInterval]);

    const mainSize = isMobile ? 150 : 244;

    return (
        <div className='max-w-screen'>
            <div className='flex flex-col items-center space-y-4 overflow-hidden mt-3'>
                <div className='flex items-center space-x-4 '>
                    <div className="flex space-x-2">
                        {prevIndices.map((idx, i) => (
                            <div key={`next-${i}`} className={'relative'} style={{width: `${mainSize}px`}}>
                                <ProductCard product={products[idx]} mainSize={mainSize}/>
                            </div>
                        ))}
                    </div>

                    <div className='relative' style={{width: `${mainSize}px`}}>
                        <ProductCard product={products[activeIndex]} mainSize={mainSize}/>
                    </div>

                    <div className='flex space-x-4'>
                        {nextIndices.map((idx, i) => (
                            <div key={`next-${i}`} className={'relative'} style={{width: `${mainSize}px`}}>
                                <ProductCard product={products[idx]} mainSize={mainSize}/>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="flex items-center justify-between space-x-4 bg-background rounded-t-lg px-2">
                    <button
                        onClick={goToPrev}
                        aria-label="Anterior"
                        className="p-2 rounded-full transition cursor-pointer"
                    >
                        <ChevronLeftIcon className='text-fy' height={20}/>
                    </button>

                    <div className="flex space-x-2 justify-between items-center">
                        {products.map((_, index) => (
                            <button
                                key={index}
                                onClick={() => goToIndex(index)}
                                aria-label={`Ir para imagem ${index + 1}`}
                                className={cn(
                                    'w-3 h-3 rounded-full transition',
                                    index === activeIndex ? 'bg-principal' : 'bg-gray-300'
                                )}
                            />
                        ))}
                    </div>

                    <button
                        onClick={goToNext}
                        aria-label="Próxima"
                        className="p-2 rounded-full transition cursor-pointer"
                    >
                        <ChevronRightIcon className='text-fy' height={20}/>
                    </button>
                </div>
            </div>
        </div>
    )
}
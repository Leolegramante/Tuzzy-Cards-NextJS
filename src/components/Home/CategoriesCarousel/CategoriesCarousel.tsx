'use client';

import {cn} from "@/helpers/cs";
import Image from "next/image";
import Link from "next/link";
// import {cn} from "@/helpers/cs";
import {useCallback, useEffect, useRef, useState} from 'react'
import SinglePackIcon from "../../../../public/assets/single-pack-icon.svg";
import TriplePackIcon from "../../../../public/assets/triple-pack-icon.svg";

const categoriesNavigation = [
    {
        name: 'Pokémon',
        href: '/products?categoryIds=1',
        image: TriplePackIcon,
    },
    {
        name: 'Booster Box',
        href: '/products?categoryIds=3,8',
        image: TriplePackIcon,

    },
    {
        name: 'Blister Unitário',
        href: '/products?categoryIds=7',
        image: SinglePackIcon,

    },
    {
        name: 'Blister Triplo',
        href: '/products?categoryIds=4,6',
        image: TriplePackIcon,

    },
    {
        name: 'Blister Quadruplo',
        href: '/products?categoryIds=5',
        image: TriplePackIcon,

    },
    {
        name: 'Coleção Treinador Avançado',
        href: '/products?categoryIds=2,9',
        image: TriplePackIcon,

    },
    {
        name: 'Desafio Estratégico',
        href: '/products?categoryIds=12,13',
        image: TriplePackIcon,

    },
    {
        name: 'Combo de Pacotes',
        href: '/products?categoryIds=10,11',
        image: TriplePackIcon,

    },
    {
        name: 'Latas',
        href: '/products?categoryIds=14',
        image: TriplePackIcon,

    },
    {
        name: 'Caixa Premium',
        href: '/products?categoryIds=15,16',
        image: TriplePackIcon,

    },
];

export function CategoriesCarousel() {
    const [activeIndex, setActiveIndex] = useState(0);
    const intervalRef = useRef<NodeJS.Timeout | null>(null);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 640);
        };

        handleResize(); // define inicialmente

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const numSideImages = isMobile ? 1 : 2;

    const prevIndices = Array.from({length: numSideImages}, (_, i) =>
        (activeIndex - (numSideImages - i) + categoriesNavigation.length) % categoriesNavigation.length
    );

    const nextIndices = Array.from({length: numSideImages}, (_, i) =>
        (activeIndex + i + 1) % categoriesNavigation.length
    );

    const resetInterval = useCallback(() => {
        if (intervalRef.current) clearInterval(intervalRef.current);
        intervalRef.current = setInterval(() => {
            setActiveIndex((prev) => (prev + 1) % categoriesNavigation.length);
        }, 5000);
    }, []);

    const goToNext = useCallback(() => {
        setActiveIndex((prev) => (prev + 1) % categoriesNavigation.length);
        resetInterval();
    }, [resetInterval]);

    const goToPrev = useCallback(() => {
        setActiveIndex((prev) => (prev - 1 + categoriesNavigation.length) % categoriesNavigation.length);
        resetInterval();
    }, [resetInterval]);

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

    return (
        <div className='flex flex-col items-center w-full py-6 mx-auto divide-y divide-principal gap-4'>
            <div className='w-full'>
                <h3 className='font-semibold text-xl text-principal text-center'>Busque por categoria</h3>
            </div>
            <div className='w-full max-w-7xl mx-auto'>
                <div className="flex flex-col items-center space-y-4 overflow-hidden">
                    <div className="flex items-center justify-start space-x-4">
                        <div className="flex space-x-2">
                            {prevIndices.map((idx) => (
                                <div key={categoriesNavigation[idx].name}
                                     className='flex group flex-col items-center justify-start cursor-pointer h-52'>
                                    <Link
                                        href={categoriesNavigation[idx].href}
                                        className='flex flex-col justify-center items-center  background-main-page-categories-items w-40 h-40'
                                    >
                                        <Image src={categoriesNavigation[idx].image}
                                               alt={`Imagem da categoria ${categoriesNavigation[idx].name}`}
                                               height={80}
                                               className='mx-auto'
                                        />

                                    </Link>
                                    <p className='text-principal font-semibold text-md text-center'>{categoriesNavigation[idx].name}</p>
                                </div>
                            ))}
                        </div>
                        <div
                            className='flex group flex-col items-center justify-start cursor-pointer h-52'>
                            <Link
                                href={categoriesNavigation[activeIndex].href}
                                className='flex flex-col justify-center items-center  background-main-page-categories-items w-40 h-40'
                            >
                                <Image src={categoriesNavigation[activeIndex].image}
                                       alt={`Imagem da categoria ${categoriesNavigation[activeIndex].name}`}
                                       height={80}
                                       className='mx-auto'
                                />

                            </Link>
                            <p className='text-principal font-semibold text-md text-center'>{categoriesNavigation[activeIndex].name}</p>
                        </div>
                        <div className="flex space-x-2">
                            {nextIndices.map((idx) => (
                                <div key={categoriesNavigation[idx].name}
                                     className='flex group flex-col items-center justify-start cursor-pointer h-52'>
                                    <Link
                                        href={categoriesNavigation[idx].href}
                                        className='flex flex-col justify-center items-center  background-main-page-categories-items w-40 h-40'
                                    >
                                        <Image src={categoriesNavigation[idx].image}
                                               alt={`Imagem da categoria ${categoriesNavigation[idx].name}`}
                                               height={80}
                                               className='mx-auto'
                                        />

                                    </Link>
                                    <p className='text-principal font-semibold text-md text-center'>{categoriesNavigation[idx].name}</p>
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
                            ◀
                        </button>

                        <div className="flex space-x-2 justify-between items-center">
                            {categoriesNavigation.map((_, index) => (
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
                            ▶
                        </button>
                    </div>
                </div>

            </div>
        </div>
    );
}
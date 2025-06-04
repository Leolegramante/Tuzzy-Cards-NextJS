'use client'

import {ChevronLeftIcon, ChevronRightIcon} from "@heroicons/react/24/solid";
import Image, {StaticImageData} from "next/image";
import Link from "next/link";
import React, {useCallback, useEffect, useState} from 'react';
import LeftNavigationTriangle from '../../../../public/assets/home-carousel-nav-left.png';
import RightNavigationTriangle from '../../../../public/assets/home-carousel-nav-right.png';

interface CarouselProps {
    images: {
        href: string;
        image: StaticImageData;
    }[]
}

export function Carousel({images}: CarouselProps) {

    // Create infinite array by duplicating items
    const extendedItems = [...images, ...images, ...images];
    const [currentIndex, setCurrentIndex] = useState(images.length); // Start at the middle set
    const [isTransitioning, setIsTransitioning] = useState(false);

    const [autoPlayKey, setAutoPlayKey] = useState(0);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 640);
        };

        handleResize(); // define inicialmente

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const mainSize = isMobile ? 250 : 512;
    const sideSize = isMobile ? 150 : 388;

    const handleNext = useCallback(() => {
        if (isTransitioning) return;

        setIsTransitioning(true);
        setCurrentIndex(prev => prev + 1);
        setAutoPlayKey(prev => prev + 1);
    }, [isTransitioning]);

    // Auto-slide functionality
    useEffect(() => {
        const interval = setInterval(() => {
            handleNext();
        }, 4000);

        return () => clearInterval(interval);
    }, [autoPlayKey, handleNext]);

    const handlePrev = () => {
        if (isTransitioning) return;

        setIsTransitioning(true);
        setCurrentIndex(prev => prev - 1);
        setAutoPlayKey(prev => prev + 1);
    };

    // Handle infinite loop reset
    useEffect(() => {
        if (currentIndex >= images.length * 2) {
            setTimeout(() => {
                setIsTransitioning(false);
                setCurrentIndex(images.length);
            }, 500);
        } else if (currentIndex < images.length) {
            setTimeout(() => {
                setIsTransitioning(false);
                setCurrentIndex(images.length * 2 - 1);
            }, 500);
        } else {
            setTimeout(() => {
                setIsTransitioning(false);
            }, 500);
        }
    }, [currentIndex, images.length]);

    const gap = 16; // 16px de espaçamento

    const getCardStyle = (index: number) => {
        const position = index - currentIndex;

        // Calcula o deslocamento acumulando os tamanhos dos cards anteriores + gap
        let offset = 0;
        if (position > 0) {
            // Indo para a direita
            offset = mainSize / 2 + gap / 2 + (position - 1) * (sideSize + gap) + sideSize / 2 + gap / 2;
        } else if (position < 0) {
            // Indo para a esquerda
            offset = -(mainSize / 2 + gap / 2 + (Math.abs(position) - 1) * (sideSize + gap) + sideSize / 2 + gap / 2);
        }

        let scale = '';
        let opacity = '';
        let zIndex: string;

        switch (position) {
            case 0:
                scale = 'scale(1)';
                opacity = 'opacity-100';
                zIndex = 'z-30';
                break;
            case -1:
            case 1:
                zIndex = 'z-20';
                break;
            case -2:
            case 2:
                zIndex = 'z-10';
                break;
            default:
                opacity = 'opacity-0';
                zIndex = 'z-0';
        }

        return {
            transform: `translateX(${offset}px) ${scale}`,
            transition: isTransitioning ? 'all 0.5s cubic-bezier(0.4, 0.0, 0.2, 1)' : 'none',
            className: `${opacity} ${zIndex}`
        };
    };

    return (
        <div className="flex flex-col items-center space-y-4 overflow-hidden pt-4 w-full">
            {/* Carousel Container */}
            <div className="relative flex w-full h-[280px] md:h-[542px] items-center justify-center overflow-hidden">
                {extendedItems.map((item, index) => {
                    const style = getCardStyle(index);

                    return (
                        <div
                            key={`${item.href}-${index}`}
                            className={`absolute rounded-xl  ${style.className}`}
                            style={{
                                transform: style.transform,
                                transition: style.transition,
                                width: `${currentIndex === index ? mainSize : sideSize}px`,
                                height: `${currentIndex === index ? mainSize : sideSize}px`,
                                marginLeft: gap / 2,
                                marginRight: gap / 2,
                            }}
                        >
                            <Link href={item.href}>
                                <Image
                                    src={item.image}
                                    alt={`imagem ${index + 1}`}
                                    fill
                                    sizes={`(max-width: 640px) ${currentIndex === index ? mainSize : sideSize}px, ${currentIndex === index ? mainSize : sideSize}px`}
                                    style={{objectFit: 'cover'}}
                                    className="rounded-2xl transition-transform duration-500 ease-in-out hover:scale-105 cursor-pointer"
                                    loading="lazy"
                                />
                            </Link>

                        </div>
                    );
                })}
            </div>

            <div className='flex'>
                <Image src={LeftNavigationTriangle} alt={''} height={40} className='h-10 w-auto'/>
                <div className="flex items-center justify-between space-x-4 bg-white px-2 z-10">
                    <button
                        onClick={handlePrev}
                        aria-label="Anterior"
                        className="p-2 rounded-full transition cursor-pointer"
                    >
                        <ChevronLeftIcon className='text-fy' height={20}/>
                    </button>

                    <div className="flex space-x-2 justify-between items-center">
                        {images.map((_, index) => (
                            <button
                                key={index}
                                onClick={() => {
                                    if (!isTransitioning) {
                                        setIsTransitioning(true);
                                        setCurrentIndex(images.length + index);
                                        setAutoPlayKey(prev => prev + 1);
                                    }
                                }}
                                aria-label={`Ir para imagem ${index + 1}`}
                                className={`w-3 h-3 rounded-full transition-all duration-200 ${
                                    (currentIndex % images.length) === index
                                        ? 'bg-principal scale-110'
                                        : 'bg-gray-300 hover:bg-gray-400'
                                }`}
                            />
                        ))}
                    </div>

                    <button
                        onClick={handleNext}
                        aria-label="Próxima"
                        className="p-2 rounded-full transition cursor-pointer"
                    >
                        <ChevronRightIcon className='text-fy' height={20}/>
                    </button>
                </div>
                <Image src={RightNavigationTriangle} alt={''} height={40} className='h-10 w-auto'/>
            </div>
        </div>
    );
}

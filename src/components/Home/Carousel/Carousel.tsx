'use client'

import {cn} from "@/helpers/cs";
import Image, {StaticImageData} from "next/image";
import {useCallback, useEffect, useRef, useState} from 'react'
import LeftNavigationTriangle from '../../../../public/assets/home-carousel-nav-left.png';
import RightNavigationTriangle from '../../../../public/assets/home-carousel-nav-right.png';


interface ImageCarouselProps {
    images: StaticImageData[];
}

export const Carousel: React.FC<ImageCarouselProps> = ({images}) => {
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
        (activeIndex - (numSideImages - i) + images.length) % images.length
    );

    const nextIndices = Array.from({length: numSideImages}, (_, i) =>
        (activeIndex + i + 1) % images.length
    );

    const resetInterval = useCallback(() => {
        if (intervalRef.current) clearInterval(intervalRef.current);
        intervalRef.current = setInterval(() => {
            setActiveIndex((prev) => (prev + 1) % images.length);
        }, 5000);
    }, [images.length]);

    const goToNext = useCallback(() => {
        setActiveIndex((prev) => (prev + 1) % images.length);
        resetInterval();
    }, [images.length, resetInterval]);

    const goToPrev = useCallback(() => {
        setActiveIndex((prev) => (prev - 1 + images.length) % images.length);
        resetInterval();
    }, [images.length, resetInterval]);

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

    const mainSize = isMobile ? 250 : 512;
    const sideSize = isMobile ? 150 : 388;

    return (
        <div className="flex flex-col items-center space-y-4 overflow-hidden">
            <div className="flex items-center space-x-4">
                <div className="flex space-x-2">
                    {prevIndices.map((idx, i) => (
                        <button
                            key={`prev-${i}`}
                            onClick={goToPrev}
                            aria-label={`Imagem anterior ${i + 1}`}
                            className="focus:outline-none cursor-pointer"
                        >
                            <div className={'relative'} style={{width: `${sideSize}px`, height: `${sideSize}px`}}>
                                <Image
                                    src={images[idx].src}
                                    alt={`imagem ${i + 1}`}
                                    fill
                                    sizes={`(max-width: 640px) ${sideSize}px, ${sideSize}px`}
                                    style={{objectFit: 'cover'}}
                                    className="rounded-lg"
                                    loading="lazy"
                                />
                            </div>
                        </button>
                    ))}
                </div>

                <div className={'relative'} style={{width: `${mainSize}px`, height: `${mainSize}px`}}>
                    <Image
                        src={images[activeIndex].src}
                        alt={`imagem ${1}`}
                        fill
                        sizes={`(max-width: 640px) ${sideSize}px, ${sideSize}px`}
                        style={{objectFit: 'cover'}}
                        className="rounded-lg"
                        priority
                    />
                </div>

                <div className="flex space-x-2">
                    {nextIndices.map((idx, i) => (
                        <button
                            key={`next-${i}`}
                            onClick={goToNext}
                            aria-label={`Próxima imagem ${i + 1}`}
                            className="focus:outline-none cursor-pointer"
                        >
                            <div className={'relative'} style={{width: `${sideSize}px`, height: `${sideSize}px`}}>
                                <Image
                                    src={images[idx].src}
                                    alt={`imagem ${i + 1}`}
                                    fill
                                    sizes={`(max-width: 640px) ${sideSize}px, ${sideSize}px`}
                                    style={{objectFit: 'cover'}}
                                    className="rounded-lg"
                                    loading="lazy"
                                />
                            </div>
                        </button>
                    ))}
                </div>
            </div>

            <div className='flex'>
                <Image src={LeftNavigationTriangle} alt={''} height={40} className='h-10 w-auto'/>
                <div className="flex items-center justify-between space-x-4 bg-white px-2">
                    <button
                        onClick={goToPrev}
                        aria-label="Anterior"
                        className="p-2 rounded-full transition cursor-pointer"
                    >
                        ◀
                    </button>

                    <div className="flex space-x-2 justify-between items-center">
                        {images.map((_, index) => (
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
                <Image src={RightNavigationTriangle} alt={''} height={40} className='h-10 w-auto'/>

            </div>
        </div>
    );
};

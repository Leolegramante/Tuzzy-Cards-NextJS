"use client";

import Image from "next/image";
import Link from "next/link";
import {useRef, useState} from "react";
import premiumBoxImage from "../../../../public/assets/products-category/Charizard em Dobro.png";
import boosterBoxImage from "../../../../public/assets/products-category/Destined Rivals - Booster Box Tuzzy Cards.png";
import buildAndBattleImage
    from "../../../../public/assets/products-category/Destined Rivals - Build and Battle Tuzzy Cards.png";
import etbImage
    from "../../../../public/assets/products-category/Destined Rivals - Elite Trainer Box 01 Tuzzy Cards.png";
import singleBoosterImage
    from '../../../../public/assets/products-category/Kit - Blister Unitário EV10 Pokémon TCG Rivais Predestinados Tuzzy Cards.png';
import boosterBundleImage
    from "../../../../public/assets/products-category/Kit - Mini Booster Box 2x EV10 Pokémon TCG Rivais Predestinados Tuzzy Cards.png";
import quadPackImage
    from "../../../../public/assets/products-category/Kit - Pacote Quádruplo EV10 Pokémon TCG Rivais Predestinados Tuzzy Cards.png";
import tinImage from "../../../../public/assets/products-category/Mini Tin.png";

import pokemonLogoImage from "../../../../public/assets/products-category/pokemon-log.png";

const categoriesNavigation = [
    {
        name: "Pokémon",
        href: "/products?categoryIds=1",
        image: pokemonLogoImage,
    },
    {
        name: "Booster Box",
        href: "/products?categoryIds=3,8",
        image: boosterBoxImage,
    },
    {
        name: "Blister Unitário",
        href: "/products?categoryIds=7",
        image: singleBoosterImage,
    },
    {
        name: "Blister Triplo",
        href: "/products?categoryIds=4,6",
        image: quadPackImage,
    },
    {
        name: "Blister Quadruplo",
        href: "/products?categoryIds=5",
        image: quadPackImage,
    },
    {
        name: "Coleção Treinador Avançado",
        href: "/products?categoryIds=2,9",
        image: etbImage,
    },
    {
        name: "Desafio Estratégico",
        href: "/products?categoryIds=12,13",
        image: buildAndBattleImage,
    },
    {
        name: "Combo de Pacotes",
        href: "/products?categoryIds=10,11",
        image: boosterBundleImage,
    },
    {
        name: "Latas",
        href: "/products?categoryIds=14",
        image: tinImage,
    },
    {
        name: "Caixa Premium",
        href: "/products?categoryIds=15,16",
        image: premiumBoxImage,
    },
];

export function CategoriesCarousel() {
    const scrollRef = useRef<HTMLDivElement>(null);
    const [isDragging, setIsDragging] = useState(false);
    const [startX, setStartX] = useState(0);
    const [scrollLeft, setScrollLeft] = useState(0);

    const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!scrollRef.current) return;
        setIsDragging(true);
        setStartX(e.pageX - scrollRef.current.offsetLeft);
        setScrollLeft(scrollRef.current.scrollLeft);
    };

    const handleMouseLeave = () => setIsDragging(false);
    const handleMouseUp = () => setIsDragging(false);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!isDragging || !scrollRef.current) return;
        e.preventDefault();
        const x = e.pageX - scrollRef.current.offsetLeft;
        const walk = (x - startX);
        scrollRef.current.scrollLeft = scrollLeft - walk;
    };

    return (
        <div className="flex flex-col items-center w-full py-6 mx-auto divide-y divide-principal gap-4">
            <div className="w-full">
                <h3 className="font-semibold text-xl text-principal text-center">
                    Busque por categoria
                </h3>
            </div>
            <div className="w-full max-w-7xl mx-auto pt-2">
                <div
                    className={`flex overflow-x-auto scrollbar-hide flex-nowrap items-center justify-start space-x-4 ${
                        isDragging ? "cursor-grabbing" : "cursor-grab"
                    }`}
                    ref={scrollRef}
                    onMouseDown={handleMouseDown}
                    onMouseLeave={handleMouseLeave}
                    onMouseUp={handleMouseUp}
                    onMouseMove={handleMouseMove}
                >
                    {categoriesNavigation.map((category, index) => (
                        <div
                            key={category.name}
                            className={`flex group flex-col items-center justify-start cursor-pointer h-[190px] w-[112px] lg:h-52 lg:w-[136px] pt-2 ${
                                index % 2 === 0 ? "mt-4" : "mb-4"
                            }`}
                        >
                            <Link
                                href={category.href}
                                className="flex flex-col justify-center items-center  background-main-page-categories-items w-28 h-28"
                            >
                                <Image
                                    src={category.image}
                                    alt={`Imagem da categoria ${category.name}`}
                                    height={100}
                                    className="mx-auto"
                                    placeholder="blur"
                                    blurDataURL={category.image.src}
                                />
                            </Link>
                            <p className="text-principal font-semibold text-md text-center">
                                {category.name}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

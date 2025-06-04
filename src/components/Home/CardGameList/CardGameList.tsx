"use client";

import Image from "next/image";
import Link from "next/link";
import {useRef, useState} from "react";
import alteredLogoImage from "../../../../public/assets/card-games/altered-logo.webp";
import lorcanaLogoImage from "../../../../public/assets/card-games/disney_lorcana_tcg_logo_transparent.webp";
import magicLogoImage from "../../../../public/assets/card-games/Magic-The-Gathering-Logo.png";
import onePieceLogoImage from "../../../../public/assets/card-games/one piece card game logo.png";
import pokemonLogoImage from "../../../../public/assets/card-games/pokemon-log.png";
import starWarsLogoImage from "../../../../public/assets/card-games/star wars unlimited logo.png";
import toppsLogoImage from "../../../../public/assets/card-games/Topps-logo.png";

const cardGameNavigation = [
    {
        name: "Pokémon",
        href: "/products?categoryIds=1",
        image: pokemonLogoImage,
    },
    {
        name: "Lorcana",
        href: "/products?categoryIds=20",
        image: lorcanaLogoImage,
    },
    {
        name: "Magic: The Gathering",
        href: "/products?categoryIds=18",
        image: magicLogoImage,
    },
    {
        name: "One Piece",
        href: "/products?categoryIds=19",
        image: onePieceLogoImage,
    },
    {
        name: "Star Wars: Unlimited",
        href: "/products?categoryIds=21",
        image: starWarsLogoImage,
    },
    {
        name: "Altered",
        href: "/products?categoryIds=22",
        image: alteredLogoImage,
    }, {
        name: "Topps",
        href: "/products?categoryIds=23",
        image: toppsLogoImage,
    },

];

export function CardGameList() {
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
        <div className="flex flex-col items-center w-full py-6 mx-auto gap-4">
            <div className="w-full">
                <h3 className="font-semibold text-xl text-principal text-center">
                    Busque por jogo
                </h3>
            </div>
            <div className="w-full max-w-7xl mx-auto pt-2">
                <div
                    className={`flex overflow-x-auto scrollbar-hide flex-nowrap items-center space-x-4 pl-4 lg:pl-0 lg:justify-center ${
                        isDragging ? "cursor-grabbing" : "cursor-grab"
                    }`}
                    ref={scrollRef}
                    onMouseDown={handleMouseDown}
                    onMouseLeave={handleMouseLeave}
                    onMouseUp={handleMouseUp}
                    onMouseMove={handleMouseMove}
                >
                    {cardGameNavigation.map((cardGame) => (
                        <div
                            key={cardGame.name}
                            className={`flex flex-col items-center justify-start cursor-pointer h-[190px] w-36 lg:h-52 pt-2`}
                        >
                            <Link
                                href={cardGame.href}
                                className="flex flex-col justify-center items-center w-36 h-28 bg-white rounded-lg shadow-md hover:shadow-2xl hover:scale-110 transition-all duration-1000 px-2"
                            >
                                <Image
                                    src={cardGame.image}
                                    alt={`Imagem da categoria ${cardGame.name}`}
                                    height={150}
                                    className="mx-auto"
                                    placeholder="blur"
                                    blurDataURL={cardGame.image.src}
                                />
                            </Link>
                            <p className="text-principal font-semibold text-md text-center mt-2">
                                {cardGame.name}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

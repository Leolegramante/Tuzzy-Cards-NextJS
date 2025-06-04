'use client';

import {CardGameList} from "@/components";
import {CategoriesCarousel} from "../CategoriesCarousel/CategoriesCarousel";

export function CategoryList() {

    return (
        <div className='flex flex-col items-center w-full py-6 mx-auto gap-4'>
            <h2 className='font-bold text-3xl text-principal opacity-25'>Links rápidos</h2>
            <CategoriesCarousel/>
            <CardGameList/>
        </div>
    );
}
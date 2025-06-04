'use client'

import {ProductDto} from "@/helpers";
import {useCartStore} from "@/store/useCartStore";
import Image from "next/image";
import Link from "next/link";

export function ProductCard({product, mainSize}: { product: ProductDto, mainSize: number }) {
    const {addItem} = useCartStore();

    return (
        <div
            className={`relative group flex flex-col items-center justify-center bg-white rounded-lg shadow-md`}
            style={{width: `${mainSize}px`}}
        >
            <Link href={`/product/details/${product.sku}`} className='cursor-pointer hover:'>
                <div className={'relative group-hover:opacity-90'}
                     style={{width: `${mainSize}px`, height: `${mainSize}px`}}>
                    <Image
                        src={product.backendImages ? product.backendImages[0].url : ''}
                        alt={product.name + ' image'}
                        fill
                        sizes={`(max-width: 640px) ${mainSize}px, ${mainSize}px`}
                        style={{objectFit: 'cover'}}
                        loading="eager"
                        placeholder='blur'
                        blurDataURL={product.backendImages ? product.backendImages[0].url : ''}
                        className="rounded-lg group-hover:opacity-75"
                    />
                </div>

                <h3 className="h-20 text-sm font-medium text-principal mt-2 px-2 overflow-hidden text-ellipsis">
                    {product.name}
                </h3>
                <p className="relative text-lg mt-2 px-2 font-semibold text-principal">{product.price}</p>
            </Link>

            <div className="mt-2 w-full">
                <button
                    onClick={() => addItem({
                        id: Number(product.id) || 0,
                        price: product?.priceInCents ? product.priceInCents : 0,
                        sku: product.sku,
                        name: product.name,
                        image: product.backendImages ? product.backendImages[0].url : '',
                        inStock: true,
                        width: product.width || 0,
                        height: product.height || 0,
                        depth: product.depth || 0,
                        weight: product.weight || 0,
                    })}
                    type='button'
                    className="relative w-full flex items-center justify-center rounded-md border border-transparent bg-principal px-8 py-2 text-sm font-medium text-gray-50 hover:bg-gray-50 hover:text-principal hover:border-principal cursor-pointer"
                >
                    Adicionar ao carrinho<span className="sr-only">, {product.name}</span>
                </button>
            </div>
        </div>
    )
}
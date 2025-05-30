'use client'

import {useCartStore} from "@/store/useCartStore";
import {formatCentsToBRL} from "@/utils";
import {ExclamationTriangleIcon, TrashIcon} from "@heroicons/react/20/solid";
import Image from "next/image";
import {useEffect, useState} from "react";

export default function CheckoutItems() {
    const [total, setTotal] = useState<number>(0);
    const {items, removeItem, updateItemQuantity, getCartTotal} = useCartStore();

    useEffect(() => {
        setTotal(getCartTotal());
    }, [getCartTotal, items]);

    return (
        <div
            className="mt-4 w-full rounded-lg border border-gray-200 bg-white shadow-xs flex flex-col justify-between h-fit min-h-20">
            <h3 className="sr-only">Items in your cart</h3>
            {items.length > 0 && (
                <>
                    <ul role="list" className="divide-y divide-gray-200">
                        {items.map((product) => (
                            <li key={product.id} className="flex px-4 py-6 sm:px-6 h-48 md:h-44">
                                <div className="shrink-0">
                                    <Image alt={'product.imageAlt'}
                                           src={product.image ? product.image : ''}
                                           height={48}
                                           width={80}
                                           priority={true}
                                           className="w-auto"
                                    />
                                </div>

                                <div className="ml-6 flex flex-1 flex-col justify-between">
                                    <div className="flex items-start">
                                        <div className="min-w-0 flex-1">
                                            <h4 className="text-md ont-medium text-principal">
                                                {product.name}
                                            </h4>
                                        </div>

                                        <div className="ml-4 flow-root shrink-0">
                                            <button
                                                onClick={() => removeItem(product.id)}
                                                type="button"
                                                className="-m-2.5 flex items-center justify-center bg-white p-2.5 text-red-600 hover:text-red-400 cursor-pointer"
                                            >
                                                <span className="sr-only">Remove</span>
                                                <TrashIcon aria-hidden="true" className="size-5"/>
                                            </button>
                                        </div>
                                    </div>

                                    {product.inStock === false && (
                                        <div className='flex items-center gap-2'>
                                            <ExclamationTriangleIcon height={24} width={24} className="text-red-600"/>
                                            <p className="text-md text-red-600">
                                                Produto fora de estoque
                                            </p>
                                        </div>
                                    )}

                                    <div className="flex items-center justify-between pt-2 h-14">
                                        <p className="mt-1 text-sm font-medium text-principal">{formatCentsToBRL(product.price * product.quantity)}</p>

                                        <div className="flex items-center">
                                            <button
                                                onClick={() => updateItemQuantity(product.id, product.quantity - 1)}
                                                className="px-2 py-1 border border-principal bg-fy text-principal rounded-l-lg hover:border-fy hover:text-fy hover:bg-principal cursor-pointer">-
                                            </button>
                                            <p className="text-principal px-2">{product.quantity}</p>
                                            <button
                                                onClick={() => updateItemQuantity(product.id, product.quantity + 1)}
                                                className="px-2 py-1 border border-principal bg-fy text-principal rounded-r-lg hover:border-fy hover:text-fy hover:bg-principal cursor-pointer">+
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </li>
                        ))}
                    </ul>
                    <div
                        className="flex items-center justify-between px-4 py-6 sm:px-6 border border-transparent border-t-gray-200">
                        <dt className="text-md font-bold">Subtotal</dt>
                        <dd className="text-md font-bold text-principal">{formatCentsToBRL(total)}</dd>
                    </div>
                </>
            )}
            {items.length <= 0 && (
                <div className='flex flex-col flex-1 items-center justify-center '>
                    <p className='text-principal text-2xl font-bold'>Seu carrinho está vazio</p>
                </div>
            )}
        </div>

    )
}
'use client'
import {CartItem as CartItemType, useCartStore} from "@/store/useCartStore";
import {Dialog, DialogPanel, DialogTitle, Transition, TransitionChild} from "@headlessui/react";
import {XMarkIcon} from "@heroicons/react/24/outline";
import Image from "next/image";
import {Fragment} from "react";

interface CartItemProps {
    item: CartItemType;
}

function formatCentsToBRL(cents: number): string {
    const valueInReais = cents / 100;
    return valueInReais.toLocaleString('pt-BR', {
        style: 'currency',
        currency: 'BRL',
    });
}

function CartItem({item}: CartItemProps) {
    const {updateItemQuantity, removeItem} = useCartStore();
    return (
        <li className="flex py-6">
            <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                <Image
                    src={item.image || 'https://via.placeholder.com/100'}
                    alt={item.name}
                    className="h-full w-full object-cover object-center"
                    height={96}
                    width={96}
                />
            </div>

            <div className="ml-4 flex flex-1 flex-col">
                <div>
                    <div className="flex justify-between text-base font-medium text-principal">
                        <h3 className='h-12 overflow-hidden text-ellipsis'>{item.name}</h3>

                        <p className="ml-4">{formatCentsToBRL(item.price * item.quantity)}</p>
                    </div>
                </div>
                <div className="flex flex-1 items-center justify-between text-sm mt-2">
                    <div className="flex items-center">
                        <button onClick={() => updateItemQuantity(item.id, item.quantity - 1)}
                                className="px-2 py-1 border border-principal bg-fy text-principal rounded-l-lg hover:border-fy hover:text-fy hover:bg-principal cursor-pointer">-
                        </button>
                        <p className="text-principal px-2">{item.quantity}</p>
                        <button onClick={() => updateItemQuantity(item.id, item.quantity + 1)}
                                className="px-2 py-1 border border-principal bg-fy text-principal rounded-r-lg hover:border-fy hover:text-fy hover:bg-principal cursor-pointer">+
                        </button>
                    </div>
                    <div className="flex">
                        <button
                            type="button"
                            onClick={() => removeItem(item.id)}
                            className="px-2 py-1 font-medium text-red-500 hover:text-white hover:bg-red-500 cursor-pointer rounded-lg"
                        >
                            Remover
                        </button>
                    </div>
                </div>
            </div>
        </li>
    );
}

export default function CartModal() {
    const {isCartOpen, toggleCart, items, getCartTotal} = useCartStore();

    return (
        <Transition show={isCartOpen} as={Fragment}>
            <Dialog as="div" className="relative z-10" onClose={toggleCart}>
                <TransitionChild
                    as={Fragment}
                    enter="ease-in-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in-out duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-black/20 display-none md:block"/>
                </TransitionChild>

                <div className="fixed inset-0 overflow-hidden">
                    <div className="absolute inset-0 overflow-hidden">
                        <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full sm:pl-10">
                            <TransitionChild
                                as={Fragment}
                                enter="transform transition ease-in-out duration-300 sm:duration-500"
                                enterFrom="translate-x-full"
                                enterTo="translate-x-0"
                                leave="transform transition ease-in-out duration-200 sm:duration-300"
                                leaveFrom="translate-x-0"
                                leaveTo="translate-x-full"
                            >
                                <DialogPanel className="pointer-events-auto w-screen max-w-md">
                                    <div className="flex h-full flex-col overflow-y-scroll bg-white shadow-xl">
                                        <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
                                            <div className="flex items-start justify-between">
                                                <DialogTitle className="text-lg font-medium text-gray-900">
                                                    Seu carrinho de compras
                                                </DialogTitle>
                                                <div className="ml-3 flex h-7 items-center">
                                                    <button
                                                        type="button"
                                                        className="-m-2 p-2 text-principal hover:text-fy"
                                                        onClick={toggleCart}
                                                    >
                                                        <span className="sr-only">Close panel</span>
                                                        <XMarkIcon className="h-6 w-6" aria-hidden="true"/>
                                                    </button>
                                                </div>
                                            </div>

                                            <div className="mt-8">
                                                <div className="flow-root">
                                                    {items.length === 0 ? (
                                                        <div className='flex flex-col items-center justify-center'>
                                                            <p>Seu carrinho está vazio!</p>
                                                        </div>
                                                    ) : (
                                                        <ul role="list" className="-my-6 divide-y divide-gray-200">
                                                            {items.map((item) => (
                                                                <CartItem key={item.id} item={item}/>
                                                            ))}
                                                        </ul>
                                                    )}
                                                </div>
                                            </div>
                                        </div>

                                        {items.length > 0 && (
                                            <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
                                                <div
                                                    className="flex justify-between text-base font-medium text-gray-900">
                                                    <p>Subtotal</p>
                                                    <p>{formatCentsToBRL(getCartTotal())}</p>
                                                </div>
                                                <div className="mt-6">
                                                    <a
                                                        onClick={toggleCart}
                                                        href="/checkout" // Replace with actual checkout link
                                                        className="flex items-center justify-center px-6 py-3 bg-principal text-fy text-lg rounded-lg mt-4 hover:text-principal hover:bg-fy cursor-pointer"
                                                    >
                                                        Finalizar compra
                                                    </a>
                                                </div>
                                                <div
                                                    className="mt-6 flex justify-center text-center text-sm text-gray-500">
                                                    <button
                                                        type="button"
                                                        className="font-medium text-principal hover:text-fy cursor-pointer"
                                                        onClick={toggleCart}
                                                    >
                                                        Continue comprando
                                                        <span aria-hidden="true"> &rarr;</span>
                                                    </button>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </DialogPanel>
                            </TransitionChild>
                        </div>
                    </div>
                </div>
            </Dialog>
        </Transition>
    );
}


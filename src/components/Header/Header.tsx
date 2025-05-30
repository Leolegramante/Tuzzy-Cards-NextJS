'use client'

import CartModal from "@/components/Cart/Modals/CartModal";
import {useCartStore} from "@/store/useCartStore";
import {Disclosure, DisclosureButton, DisclosurePanel, Menu, MenuButton, MenuItem, MenuItems} from "@headlessui/react";
import {UserCircleIcon} from "@heroicons/react/16/solid";
import {MagnifyingGlassIcon, ShoppingCartIcon} from "@heroicons/react/20/solid";
import {Bars3Icon, XMarkIcon} from "@heroicons/react/24/outline";
import Image from "next/image";
import Link from "next/link";
import Logo from '../../../public/assets/logo/Logo_Horizontal_Dourado.png'

export interface HeaderProps {
    session: {
        uuid: string,
        firstName: string,
        lastName: string,
        email: string,
        username: string,
        role: string,
    } | undefined
    deleteSessionAction: () => void
}

const navigation = [
    {name: 'Todos os produtos', href: '/products', current: false},
    // {name: 'Coleções', href: '#', current: false},
]

const userNavigation = [
    {name: 'Perfil', href: '/profile/me', adminOnly: false},
    {name: 'Dashboard Administrativo', href: '/admin/dashboard', adminOnly: true},
    {name: 'Sair', href: '#', adminOnly: false},
]

function classNames(...classes: unknown[]) {
    return classes.filter(Boolean).join(' ')
}

export function Header({session, deleteSessionAction}: HeaderProps) {
    const {toggleCart} = useCartStore();
    return (
        <div>
            <Disclosure as="header" className="bg-principal shadow-sm">
                <div className="mx-auto max-w-7xl px-2 sm:px-4 lg:divide-y lg:divide-fy lg:px-8">
                    <div className="relative flex h-20 justify-between">
                        <div className="relative z-10 flex px-2 lg:px-0 my-2">
                            <div className="flex shrink-0 items-center">
                                <Link href='/'>
                                    <Image src={Logo}
                                           alt='Logo Tuzzy Cards'
                                           height={75}
                                           width={120}
                                           priority
                                    />
                                </Link>
                            </div>
                        </div>
                        <div
                            className="relative z-0 flex flex-1 items-center justify-center px-2 sm:absolute sm:inset-0">
                            <div className="grid w-full grid-cols-1 sm:max-w-xs">
                                <input
                                    disabled={true}
                                    name="search"
                                    type="search"
                                    placeholder="Search"
                                    className="col-start-1 row-start-1 block w-full rounded-md bg-fy py-1.5 pr-3 pl-10 text-base text-principal outline-1 -outline-offset-1 outline-fy placeholder:text-principal focus:outline-2 focus:-outline-offset-2 focus:outline-gray-200 sm:text-sm/6 disabled:cursor-not-allowed disabled:bg-gray-700 disabled:text-gray-200 disabled:outline-none disabled:border disabled:border-fy"
                                />
                                <MagnifyingGlassIcon
                                    aria-hidden="true"
                                    className="pointer-events-none col-start-1 row-start-1 ml-3 size-5 self-center text-principal"
                                />
                            </div>
                        </div>
                        <div className="relative z-10 flex items-center lg:hidden">
                            <button
                                onClick={toggleCart}
                                type="button"
                                className="relative shrink-0 rounded-full bg-principal p-1 text-fy"
                            >
                                <ShoppingCartIcon aria-hidden="true" className="size-6"/>
                            </button>
                            {/* Mobile menu button */}
                            <DisclosureButton
                                className="group relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500">
                                <span className="absolute -inset-0.5"/>
                                <span className="sr-only">Open menu</span>
                                <Bars3Icon aria-hidden="true" className="block size-6 group-data-open:hidden"/>
                                <XMarkIcon aria-hidden="true" className="hidden size-6 group-data-open:block"/>
                            </DisclosureButton>
                        </div>
                        <div className="hidden lg:relative lg:z-10 lg:ml-4 lg:flex lg:items-center">
                            <button
                                onClick={toggleCart}
                                type="button"
                                className="relative shrink-0 rounded-full bg-principal p-1 text-fy hover:text-gray-200 cursor-pointer"
                            >
                                <ShoppingCartIcon aria-hidden="true" className="size-6"/>
                            </button>

                            {session === undefined && (
                                <div className='flex items-center justify-center p-2 gap-2'>
                                    <Link href="/auth/sign-in"
                                          className="border border-transparent hover:border-b-fy cursor-pointer">Entrar</Link>
                                    <p>|</p>
                                    <Link href="/auth/sign-up"
                                          className="border border-transparent hover:border-b-fy cursor-pointer">Cadastrar-se</Link>
                                </div>
                            )}

                            {session !== undefined && (
                                <>
                                    {/* Profile dropdown */}
                                    <Menu as="div" className="relative ml-4 shrink-0">
                                        <div>
                                            <MenuButton
                                                className="relative flex rounded-full  focus:ring-2 focus:ring-fy focus:ring-offset-2 focus:outline-fy hover:text-gray-200 cursor-pointer">
                                                <span className="absolute -inset-1.5"/>
                                                <span className="sr-only">Open user menu</span>
                                                <UserCircleIcon aria-hidden="true"
                                                                className="pointer-events-none col-start-1 row-start-1 size-7 self-center "/>
                                            </MenuButton>
                                        </div>
                                        <MenuItems
                                            transition
                                            className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 ring-1 shadow-lg ring-black/5 transition focus:outline-hidden data-closed:scale-95 data-closed:transform data-closed:opacity-0 data-enter:duration-100 data-enter:ease-out data-leave:duration-75 data-leave:ease-in"
                                            modal={false}
                                        >
                                            {userNavigation.map((item) => {
                                                if (item.adminOnly && session?.role !== 'ADMIN') {
                                                    return null;
                                                }

                                                if (item.name === 'Sair') {
                                                    return (
                                                        <button
                                                            key={item.name}
                                                            type="button"
                                                            className="block px-4 py-2 text-sm text-gray-700 data-focus:bg-gray-100 data-focus:outline-hidden cursor-pointer"
                                                            onClick={() => deleteSessionAction()}
                                                        >
                                                            {item.name}
                                                        </button>
                                                    )
                                                }

                                                return (
                                                    <MenuItem key={item.name}>
                                                        <a
                                                            href={item.href}
                                                            className="block px-4 py-2 text-sm text-gray-700 data-focus:bg-gray-100 data-focus:outline-hidden"
                                                        >
                                                            {item.name}
                                                        </a>
                                                    </MenuItem>
                                                );
                                            })}

                                        </MenuItems>
                                    </Menu>
                                </>
                            )}
                        </div>
                    </div>
                    <nav aria-label="Global"
                         className="hidden lg:flex lg:space-x-8 lg:py-2 lg:items-center lg:justify-center">
                        {navigation.map((item) =>
                            (
                                <a
                                    key={item.name}
                                    href={item.href}
                                    aria-current={item.current ? 'page' : undefined}
                                    className={classNames(
                                        item.current ? 'text-fy border border-fy' : 'text-fy border border-transparent hover:border hover:border-fy',
                                        'inline-flex items-center rounded-md px-3 py-2 text-sm font-medium',
                                    )}
                                >
                                    {item.name}
                                </a>
                            )
                        )}
                    </nav>
                </div>

                {/* Mobile dropdown */}
                <DisclosurePanel as="nav" aria-label="Global" className="lg:hidden">
                    <div className="space-y-1 px-2 pt-2 pb-3">
                        {navigation.map((item) => (
                            <DisclosureButton
                                key={item.name}
                                as="a"
                                href={item.href}
                                aria-current={item.current ? 'page' : undefined}
                                className={classNames(
                                    item.current ? 'bg-gray-100 text-fy' : 'text-fy hover:bg-gray-50',
                                    'block rounded-md px-3 py-2 text-base font-medium',
                                )}
                            >
                                {item.name}
                            </DisclosureButton>
                        ))}
                    </div>
                    <div className="border-t border-gray-200 pt-4 pb-3">
                        {session === undefined && (
                            <div className="space-y-1 px-2">
                                <DisclosureButton
                                    as="a"
                                    href="/auth/sign-in"
                                    className="block rounded-md px-3 py-2 text-base font-medium text-fy hover:bg-gray-50"
                                >
                                    Entrar
                                </DisclosureButton>
                                <DisclosureButton
                                    as="a"
                                    href="/auth/sign-up"
                                    className="block rounded-md px-3 py-2 text-base font-medium text-fy hover:bg-gray-50"
                                >
                                    Cadastrar-se
                                </DisclosureButton>
                            </div>

                        )}
                        {session !== undefined && (
                            <div className="space-y-1 px-2">
                                {userNavigation.map((item) => {

                                    if (item.adminOnly && session?.role !== 'ADMIN') {
                                        return null;
                                    }
                                    if (item.name === 'Sair') {
                                        return (
                                            <button
                                                key={item.name}
                                                type="button"
                                                className="block rounded-md px-3 py-2 text-base font-medium text-fy hover:bg-gray-50"
                                                onClick={() => deleteSessionAction()}
                                            >
                                                {item.name}
                                            </button>
                                        )
                                    }

                                    return (
                                        <DisclosureButton key={item.name}
                                                          as="a"
                                                          href={item.href}
                                                          className="block rounded-md px-3 py-2 text-base font-medium text-fy hover:bg-gray-50"
                                        >
                                            {item.name}
                                        </DisclosureButton>
                                    );

                                })}
                            </div>
                        )}
                    </div>
                </DisclosurePanel>
            </Disclosure>
            <CartModal/>
        </div>
        // <MobileHeader role={session?.role ?? 'USER'} navigation={navigation} userNavigation={userNavigation}/>
    );
}

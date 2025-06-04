'use client'

import CartModal from "@/components/Cart/Modals/CartModal";
import {cn} from "@/helpers/cs";
import {useCartStore} from "@/store/useCartStore";
import {
    Disclosure,
    DisclosureButton,
    DisclosurePanel,
    Menu,
    MenuButton,
    MenuItem,
    MenuItems,
    Popover,
    PopoverButton,
    PopoverPanel
} from "@headlessui/react";
import {UserCircleIcon} from "@heroicons/react/16/solid";
import {MagnifyingGlassIcon, ShoppingCartIcon} from "@heroicons/react/20/solid";
import {Bars3Icon, XMarkIcon} from "@heroicons/react/24/outline";
import {ChevronDownIcon, ChevronUpIcon} from "@heroicons/react/24/solid";
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
    {
        name: 'Pokémon', href: '/collections', current: false,
        children: [
            {name: 'Caixa de Booster', href: '/products?categoryIds=3,8'},
            {name: 'Caixa Premium', href: '/products?categoryIds=15,16'},
            {name: 'Coleção Treinador Avançado (ETB)', href: '/products?categoryIds=2,9'},
            {name: 'Combo de Pacotes', href: '/products?categoryIds=10,11'},
            {name: 'Blister Unitário', href: '/products?categoryIds=7'},
            {name: 'Blister Triplo', href: '/products?categoryIds=4,6'},
            {name: 'Blister Quádruplo', href: '/products?categoryIds=5'},
            {name: 'Desafio Estratégico', href: '/products?categoryIds=12,13'},
            {name: 'Experiência Premium', href: '/products?categoryIds=17'},
            {name: 'Latas', href: '/products?categoryIds=14'},
            {name: 'Todos os produtos', href: '/products?categoryIds=1'}
        ],
    },
    {
        name: 'Magic',
        children: [
            {name: 'Todos os produtos', href: '/products?categoryIds=18'}
        ],
    },
    {
        name: 'One Piece',
        children: [
            {name: 'Todos os produtos', href: '/products?categoryIds=19'}
        ],
    },
    {
        name: 'Lorcana',
        children: [
            {name: 'Todos os produtos', href: '/products?categoryIds=20'}
        ],
    },
    {
        name: 'Star Wars: Unlimited',
        children: [
            {name: 'Todos os produtos', href: '/products?categoryIds=21'}
        ],
    },
    {
        name: 'Altered',
        children: [
            {name: 'Todos os produtos', href: '/products?categoryIds=22'}
        ],
    },
    {
        name: 'Topps',
        children: [
            {name: 'Todos os produtos', href: '/products?categoryIds=23'}
        ],
    },
]

const userNavigation = [
    {name: 'Perfil', href: '/profile/me', adminOnly: false},
    {name: 'Dashboard Administrativo', href: '/admin/dashboard', adminOnly: true},
    {name: 'Sair', href: '#', adminOnly: false},
]

export function Header({session, deleteSessionAction}: HeaderProps) {
    const {toggleCart} = useCartStore();
    return (
        <div className='background-abstract'>
            <Disclosure as="header" className="shadow-sm">
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
                                className="relative shrink-0 rounded-full p-1 text-gray-50"
                            >
                                <ShoppingCartIcon aria-hidden="true" className="size-6"/>
                            </button>
                            {/* Mobile menu button */}
                            <DisclosureButton
                                className="group relative inline-flex items-center justify-center rounded-md p-2 text-gray-50">
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
                                className="relative shrink-0 rounded-full p-1 text-gray-50 hover:text-gray-200 cursor-pointer"
                            >
                                <ShoppingCartIcon aria-hidden="true" className="size-6"/>
                            </button>

                            {session === undefined && (
                                <div className='flex items-center justify-center p-2 gap-2'>
                                    <Link href="/auth/sign-in"
                                          className="border border-transparent text-gray-50 hover:border-b-gray-50 cursor-pointer">Entrar</Link>
                                    <p className='text-gray-50'>|</p>
                                    <Link href="/auth/sign-up"
                                          className="border border-transparent text-gray-50 hover:border-b-gray-50 cursor-pointer">Cadastrar-se</Link>
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
                        {navigation.map((nav) => {
                            return (
                                <Popover key={nav.name} className="relative">
                                    {({open}) => (
                                        <>
                                            <PopoverButton
                                                as="button"
                                                className={cn(
                                                    'flex items-center text-gray-50 border border-transparent hover:border-fy rounded-md px-3 py-2 text-base font-medium focus:border-fy focus:outline-none',
                                                    open && 'border-fy'
                                                )}
                                            >
                                                {nav.name}
                                                {open && (

                                                    <ChevronUpIcon width={20} height={20} className='ml-1'/>
                                                )}
                                                {!open && (
                                                    <ChevronDownIcon width={20} height={20} className='ml-1'/>
                                                )}
                                            </PopoverButton>
                                            {nav.children && (
                                                <PopoverPanel
                                                    className="absolute z-50 mt-2 w-screen max-w-sm px-4 sm:px-0">
                                                    <div
                                                        className="overflow-hidden rounded-lg">
                                                        <div
                                                            className="relative grid gap-1 bg-white p-7 lg:grid-cols-1">
                                                            {nav.children.map((child) => (
                                                                <Link
                                                                    key={child.name}
                                                                    href={child.href}
                                                                    className="p-2 text-base font-medium text-principal border border-transparent hover:border-b-principal hover:text-gray-900"
                                                                >
                                                                    {child.name}
                                                                </Link>
                                                            ))}
                                                        </div>
                                                    </div>
                                                </PopoverPanel>
                                            )}
                                        </>
                                    )}
                                </Popover>
                            );
                        })}
                    </nav>
                </div>

                {/* Mobile dropdown */}
                <DisclosurePanel as="nav" aria-label="Global" className="lg:hidden">
                    <div className="space-y-1 px-2 pt-2 pb-3">
                        {navigation.map((item) => (
                            <Disclosure key={item.name} as="div" className="space-y-1">
                                {({open}) => (
                                    <>
                                        <DisclosureButton
                                            as="button"
                                            className={cn(
                                                'flex w-full items-center rounded-md px-3 py-2 text-base font-medium text-text-gray-50 focus:outline-none',
                                            )}
                                        >
                                            {item.name}
                                            {item.children && (
                                                open ? (
                                                    <ChevronUpIcon width={20} height={20} className='ml-1'/>
                                                ) : (
                                                    <ChevronDownIcon width={20} height={20} className='ml-1'/>
                                                )
                                            )}
                                        </DisclosureButton>
                                        {item.children && (
                                            <DisclosurePanel className="pl-4">
                                                {item.children.map((child) => (
                                                    <DisclosureButton
                                                        key={child.name}
                                                        as="a"
                                                        href={child.href}
                                                        className="block rounded-md px-3 py-2 text-base font-medium text-gray-50"
                                                    >
                                                        {child.name}
                                                    </DisclosureButton>
                                                ))}
                                            </DisclosurePanel>
                                        )}
                                    </>
                                )}
                            </Disclosure>
                        ))}
                    </div>
                    <div className="border-t border-gray-200 pt-4 pb-3">
                        {session === undefined && (
                            <div className="space-y-1 px-2">
                                <DisclosureButton
                                    as="a"
                                    href="/auth/sign-in"
                                    className="block rounded-md px-3 py-2 text-base font-medium text-gray-50 hover:bg-gray-50"
                                >
                                    Entrar
                                </DisclosureButton>
                                <DisclosureButton
                                    as="a"
                                    href="/auth/sign-up"
                                    className="block rounded-md px-3 py-2 text-base font-medium text-gray-50 hover:bg-gray-50"
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
                                                className="block rounded-md px-3 py-2 text-base font-medium text-gray-50 hover:bg-gray-50"
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
                                                          className="block rounded-md px-3 py-2 text-base font-medium text-gray-50 hover:bg-gray-50"
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
    );
}

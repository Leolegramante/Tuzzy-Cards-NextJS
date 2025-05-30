import {Disclosure, DisclosureButton, DisclosurePanel, Menu, MenuButton, MenuItem, MenuItems} from "@headlessui/react";
import {MagnifyingGlassIcon, ShoppingCartIcon} from "@heroicons/react/20/solid";
import {Bars3Icon, XMarkIcon} from "@heroicons/react/24/outline";
import Image from "next/image";

interface MobileHeaderProps {
    role: string | undefined,
    navigation: { name: string, href: string, current: boolean }[]
    userNavigation: { name: string, href: string, adminOnly: boolean }[]
}

function classNames(...classes: unknown[]) {
    return classes.filter(Boolean).join(' ')
}

export function MobileHeader({role, navigation, userNavigation}: MobileHeaderProps) {
    return (
        <Disclosure as="header" className="bg-principal">
            <div className='mx-auto px-2 py-4 sm:px-4'>
                <div className='flex h-11 justify-between mx-auto'>
                    <div className="flex shrink-0 items-center">
                        <Image src='/assets/logo/Logo_Horizontal_Dourado.png'
                               alt='Logo Tuzzy Cards'
                               height={50}
                               width={80}
                               priority
                        />
                    </div>
                    <div className="flex items-center lg:hidden">
                        <Menu as="div" className="relative ml-4 shrink-0 gap-x-4">
                            <div>
                                <MenuButton
                                    className="relative flex rounded-full focus:ring-2 focus:ring-fy focus:ring-offset-2 focus:outline-fy hover:text-gray-200">
                                    <span className="absolute -inset-1.5"/>
                                    <span className="sr-only">Open user menu</span>
                                    <ShoppingCartIcon aria-hidden="true"
                                                      className="pointer-events-none col-start-1 row-start-1 size-7 self-center "/>
                                </MenuButton>
                            </div>
                            <MenuItems
                                transition
                                className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 ring-1 shadow-lg ring-black/5 transition focus:outline-hidden data-closed:scale-95 data-closed:transform data-closed:opacity-0 data-enter:duration-100 data-enter:ease-out data-leave:duration-75 data-leave:ease-in"
                            >
                                {userNavigation.map((item) => {
                                    if (item.adminOnly && role !== 'ADMIN') {
                                        return null;
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
                        {/* Mobile menu button */}
                        <DisclosureButton
                            className="group relative inline-flex items-center justify-center rounded-md p-2 text-fy">
                            <span className="absolute -inset-0.5"/>
                            <span className="sr-only">Open menu</span>
                            <Bars3Icon aria-hidden="true" className="block size-6 group-data-open:hidden"/>
                            <XMarkIcon aria-hidden="true" className="hidden size-6 group-data-open:block"/>
                        </DisclosureButton>
                    </div>
                </div>
                <div className="relative z-0 flex flex-1 items-center justify-center px-2">
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
            </div>

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
                    <div className="space-y-1 px-2">
                        {userNavigation.map((item) => {
                            if (item.adminOnly && role !== 'ADMIN') {
                                return null;
                            }

                            return (
                                <DisclosureButton
                                    key={item.name}
                                    as="a"
                                    href={item.href}
                                    className="block rounded-md px-3 py-2 text-base font-medium text-fy hover:bg-gray-50"
                                >
                                    {item.name}
                                </DisclosureButton>
                            );
                        })}
                    </div>
                </div>
            </DisclosurePanel>
        </Disclosure>
    )
}
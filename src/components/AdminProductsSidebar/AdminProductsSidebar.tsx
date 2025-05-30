import {Disclosure, DisclosureButton, DisclosurePanel} from '@headlessui/react'
import {ChevronRightIcon, Cog8ToothIcon, ShoppingBagIcon} from '@heroicons/react/20/solid'

const navigation = [
    {
        name: 'Produtos',
        pathName: 'products',
        href: '/admin/register/products',
        icon: ShoppingBagIcon
    },
    // {
    //     name: 'Pokémon TCG',
    //     icon: CurrencyDollarIcon,
    //     pathName: "pokemontcg",
    //     children: [
    //         {name: 'Artistas', pathName: "artists", href: '/admin/register/pokemontcg/artists'},
    //         {name: 'Human Resources', href: '#'},
    //         {name: 'Customer Success', href: '#'},
    //     ],
    // },
    {
        name: 'Configurações',
        pathName: 'configuration',
        icon: Cog8ToothIcon,
        children: [
            {name: 'Categoria', pathName: "categories", href: '/admin/register/configuration/categories'},
            {name: 'Sub categoria', pathName: "sub-categories", href: '/admin/register/configuration/sub-categories'},
            // {name: 'Cupons', pathName: "cupons", href: '/admin/register/configuration/cupons'},
        ]
    },
]

function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(' ')
}

interface AdminProductsSidebarProps {
    itemName?: string,
    subItemName?: string,
}

export function AdminProductsSidebar({itemName, subItemName}: AdminProductsSidebarProps) {
    return (
        <div
            className="flex grow flex-col gap-y-5 overflow-y-auto border-r rounded-lg border-gray-200 bg-white px-6 h-fit">
            <nav className="flex flex-1 flex-col py-4">
                <ul role="list" className="flex flex-1 flex-col gap-y-7">
                    <li>
                        <ul role="list" className="-mx-2 space-y-1">
                            {navigation.map((item) => (
                                <li key={item.name}>
                                    {!item.children ? (
                                        <a
                                            href={item.href}
                                            className={classNames(
                                                item.pathName === itemName ? 'bg-gray-50' : 'hover:bg-gray-50',
                                                'group flex gap-x-3 rounded-md p-2 text-sm/6 font-semibold text-principal',
                                            )}
                                        >
                                            <item.icon aria-hidden="true"
                                                       className="size-6 shrink-0 text-principal h-6 w-6"/>
                                            {item.name}
                                        </a>
                                    ) : (
                                        <Disclosure as="div">
                                            <DisclosureButton
                                                className={classNames(
                                                    item.pathName === itemName ? 'bg-gray-50' : 'hover:bg-gray-50',
                                                    'group flex w-full items-center gap-x-3 rounded-md p-2 text-left text-sm/6 font-semibold text-principal cursor-pointer',
                                                )}
                                            >
                                                <item.icon aria-hidden="true"
                                                           className="size-6 shrink-0 text-principal h-6 w-6"/>
                                                {item.name}
                                                <ChevronRightIcon
                                                    aria-hidden="true"
                                                    className="ml-auto size-5 shrink-0 text-gray-400 group-data-open:rotate-90 group-data-open:text-gray-500"
                                                />
                                            </DisclosureButton>
                                            <DisclosurePanel as="ul" className="mt-1 px-2">
                                                {item.children.map((subItem) => (
                                                    <li key={subItem.name}>
                                                        <DisclosureButton
                                                            as="a"
                                                            href={subItem.href}
                                                            className={classNames(
                                                                (subItemName && subItemName === subItem.pathName) ? 'bg-gray-50' : 'hover:bg-gray-50',
                                                                'block rounded-md py-2 pr-2 pl-9 text-sm/6 text-principal cursor-pointer',
                                                            )}
                                                        >
                                                            {subItem.name}
                                                        </DisclosureButton>
                                                    </li>
                                                ))}
                                            </DisclosurePanel>
                                        </Disclosure>
                                    )}
                                </li>
                            ))}
                        </ul>
                    </li>
                </ul>
            </nav>
        </div>
    )
}

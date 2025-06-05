import {ArchiveBoxIcon, HomeIcon, ShoppingBagIcon, ShoppingCartIcon, UsersIcon} from '@heroicons/react/20/solid'

const navigation = [
    {
        name: 'Home',
        pathName: 'dashboard',
        href: '/admin/dashboard',
        icon: HomeIcon
    },
    {
        name: 'Usuários',
        icon: UsersIcon,
        pathName: "users",
        href: '/admin/users',
    },
    {
        name: 'Produtos',
        pathName: 'products',
        icon: ShoppingBagIcon,
        href: '/admin/register/products',
    },
    {
        name: 'Pedidos',
        pathName: 'orders',
        icon: ShoppingCartIcon,
        href: '/admin/orders',
    },
    {
        name: 'Caixas de envio',
        pathName: 'boxes',
        icon: ArchiveBoxIcon,
        href: '/admin/boxes',
    },
    // {
    //     name: 'Configurações',
    //     pathName: 'configuration',
    //     icon: Cog8ToothIcon,
    //     children: [
    //         {name: 'Categoria', pathName: "categories", href: '/admin/register/configuration/categories'},
    //         {name: 'Sub categoria', pathName: "sub-categories", href: '/admin/register/configuration/sub-categories'},
    //         {name: 'Cupons', pathName: "cupons", href: '/admin/register/configuration/cupons'},
    //     ]
    // },
]

function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(' ')
}

interface AdminOptionsProps {
    pageValue: React.Dispatch<React.SetStateAction<{ itemName: string, subItemName: string | null }>>;
    itemName?: string,
    subItemName?: string,
}

export function AdminOptionsSidebar({itemName}: AdminOptionsProps) {

    return (
        <div
            className="flex grow flex-col gap-y-5 overflow-y-auto border-r rounded-lg border-gray-200 bg-white px-6 h-fit">
            <nav className="flex flex-1 flex-col py-4">
                <ul role="list" className="flex flex-1 flex-col gap-y-7">
                    <li>
                        <ul role="list" className="-mx-2 space-y-1">
                            {navigation.map((item) => (
                                <li key={item.name}>
                                    {/*{!item.children ? (*/}
                                    <a
                                        href={item.href}
                                        type='button'
                                        className={classNames(
                                            item.pathName === itemName ? 'bg-gray-50' : 'hover:bg-gray-50',
                                            'group flex gap-x-3 rounded-md p-2 text-sm/6 font-semibold text-principal w-full cursor-pointer',
                                        )}
                                    >
                                        <item.icon aria-hidden="true"
                                                   className="size-6 shrink-0 text-principal h-6 w-6"/>
                                        {item.name}
                                    </a>
                                    {/*) : (*/}
                                    {/*    <Disclosure as="div">*/}
                                    {/*        <DisclosureButton*/}
                                    {/*            className={classNames(*/}
                                    {/*                item.pathName === itemName ? 'bg-gray-50' : 'hover:bg-gray-50',*/}
                                    {/*                'group flex w-full items-center gap-x-3 rounded-md p-2 text-left text-sm/6 font-semibold text-gray-700',*/}
                                    {/*            )}*/}
                                    {/*        >*/}
                                    {/*            <item.icon aria-hidden="true"*/}
                                    {/*                       className="size-6 shrink-0 text-principal h-6 w-6"/>*/}
                                    {/*            {item.name}*/}
                                    {/*            <ChevronRightIcon*/}
                                    {/*                aria-hidden="true"*/}
                                    {/*                className="ml-auto size-5 shrink-0 text-gray-400 group-data-open:rotate-90 group-data-open:text-gray-500"*/}
                                    {/*            />*/}
                                    {/*        </DisclosureButton>*/}
                                    {/*        <DisclosurePanel as="ul" className="mt-1 px-2">*/}
                                    {/*            /!*{item.children.map((subItem) => (*!/*/}
                                    {/*            /!*    <li key={subItem.name}>*!/*/}
                                    {/*            /!*        <DisclosureButton*!/*/}
                                    {/*            /!*            onClick={() => handleValueChange(item.pathName, subItem.pathName)}*!/*/}
                                    {/*            /!*            className={classNames(*!/*/}
                                    {/*            /!*                (subItemName && subItemName === subItem.pathName) ? 'bg-gray-50' : 'hover:bg-gray-50',*!/*/}
                                    {/*            /!*                'block rounded-md py-2 pr-2 pl-9 text-sm/6 text-gray-700 w-full flex items-start',*!/*/}
                                    {/*            /!*            )}*!/*/}
                                    {/*            /!*        >*!/*/}
                                    {/*            /!*            {subItem.name}*!/*/}
                                    {/*            /!*        </DisclosureButton>*!/*/}
                                    {/*            /!*    </li>*!/*/}
                                    {/*            /!*))}*!/*/}
                                    {/*        </DisclosurePanel>*/}
                                    {/*    </Disclosure>*/}
                                    {/*)}*/}
                                </li>
                            ))}
                        </ul>
                    </li>
                </ul>
            </nav>
        </div>
    )
}

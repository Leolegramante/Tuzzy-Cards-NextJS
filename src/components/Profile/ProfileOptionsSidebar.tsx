import {cn} from "@/helpers/cs";
import {ShoppingCartIcon, UserIcon} from "@heroicons/react/24/outline";

const navigation = [
    {
        name: 'Dados pessoais',
        icon: UserIcon,
        pathName: "me",
        href: '/profile/me',
    },
    {
        name: 'Minhas compras',
        pathName: 'my-orders',
        icon: ShoppingCartIcon,
        href: '/profile/my-orders',
    },
]

export function ProfileOptionsSidebar({currentPage}: { currentPage: string }) {
    return (
        <div
            className="flex grow flex-col gap-y-5 overflow-y-auto border-r rounded-lg border-gray-200 bg-white px-6 h-fit">
            <nav className="flex flex-1 flex-col py-4">
                <ul role="list" className="flex flex-1 flex-col gap-y-7">
                    <li>
                        <ul role="list" className="-mx-2 space-y-1">
                            {navigation.map((item) => (
                                <li key={item.name}>
                                    <a
                                        href={item.href}
                                        type='button'
                                        className={cn(
                                            item.pathName === currentPage ? 'bg-gray-50' : 'hover:bg-gray-50',
                                            'group flex gap-x-3 rounded-md p-2 text-sm/6 font-semibold text-principal w-full cursor-pointer',
                                        )}
                                    >
                                        <item.icon aria-hidden="true"
                                                   className="size-6 shrink-0 text-principal h-6 w-6"/>
                                        {item.name}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </li>
                </ul>
            </nav>
        </div>
    )
}
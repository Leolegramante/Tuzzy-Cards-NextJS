import {ChevronRightIcon, HomeIcon} from "@heroicons/react/20/solid";
import Link from "next/link";

type BreadcrumbsProps = {
    pages: {
        name: string,
        href: string,
        current: boolean,
    }[]
}

export function Breadcrumbs({pages}: BreadcrumbsProps) {
    return (
        <nav aria-label="Breadcrumb" className="flex">
            <ol role="list" className="flex items-center space-x-4">
                <li>
                    <div>
                        <Link href="/" className="text-principal hover:text-fy">
                            <HomeIcon aria-hidden="true" className="size-5 shrink-0"/>
                            <span className="sr-only">Home</span>
                        </Link>
                    </div>
                </li>
                {pages.map((page) => (
                    <li key={page.name}>
                        <div className="flex items-center">
                            <ChevronRightIcon aria-hidden="true" className="size-5 shrink-0 text-principal"/>
                            <Link
                                href={page.href}
                                aria-current={page.current ? 'page' : undefined}
                                className="ml-4 text-sm font-medium text-principal hover:text-fy"
                            >
                                {page.name}
                            </Link>
                        </div>
                    </li>
                ))}
            </ol>
        </nav>
    )
}
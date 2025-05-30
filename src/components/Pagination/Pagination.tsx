"use client";

import {cn} from "@/helpers/cs";
import Link from "next/link";
import {usePathname, useSearchParams} from "next/navigation";
import {ELLIPSIS_LEFT, ELLIPSIS_RIGHT, generatePages} from "./generatePages";

interface PaginationProps {
    currentPage: number;
    totalPages: number;
    totalItems: number;
    limit: number;
    label: string;
}

export const Pagination = ({currentPage, totalPages, totalItems, label, limit}: PaginationProps) => {
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const pages = generatePages(currentPage, totalPages);

    return (
        <div className='flex items-center justify-between'>
            <div className="flex items-center">
                <p className='text-md text-principal mr-2'>exibindo <strong>{limit}</strong> de <strong>{totalItems}</strong> {label}
                </p>
            </div>
            {pages.length > 1 && (

                <ul className="inline-flex h-10 overflow-hidden rounded-md text-base border border-principal">
                    {pages.map((page, index) => {
                        const isEllipsis = page === ELLIPSIS_LEFT || page === ELLIPSIS_RIGHT;

                        const params = new URLSearchParams(searchParams);
                        params.set("page", String(page));
                        const url = `${pathname}?${params.toString()}`;

                        const isCurrentPage = page === currentPage;

                        if (isEllipsis) {
                            return (
                                <li
                                    key={index}
                                    className="border-x border-principal/40 first:rounded-l last:rounded-r first:border-0 last:border-0"
                                >
                            <span className="flex h-10 items-center justify-center px-4">
                            ...
                            </span>
                                </li>
                            );
                        }

                        return (
                            <li
                                key={index}
                                className="border-x border-principal/40 first:rounded-l last:rounded-r first:border-0 last:border-0"
                            >
                                <Link
                                    href={url}
                                    className={cn(
                                        "flex h-10 items-center justify-center text-principal hover:bg-principal px-4 hover:text-fy",
                                        {
                                            "bg-fy text-principal": isCurrentPage,
                                        }
                                    )}
                                >
                                    {page}
                                </Link>
                            </li>
                        );
                    })}
                </ul>
            )}
        </div>
    );
};

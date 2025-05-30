import {ArrowRightIcon} from "@heroicons/react/24/solid";
import Link from "next/link";

interface SectionTitleProps {
    title: string;
    link?: string;
    linkText?: string;
}

export function SectionTitle({title, link, linkText}: SectionTitleProps) {
    return (
        <div className='w-full flex items-center justify-center'>
            <div className='flex w-full max-w-7xl items-center justify-between px-4'>
                <h2 className='text-lg font-bold text-principal'>{title}</h2>
                {link && linkText && (
                    <Link href={link}
                          className='flex flex-row items-center gap-0 md:gap-2 text-principal font-semibold hover:text-fy cursor-pointer'>
                        {linkText}
                        <ArrowRightIcon height={20} width={20}/>
                    </Link>
                )}
            </div>
        </div>
    )
}
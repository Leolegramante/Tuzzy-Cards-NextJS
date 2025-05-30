'use client'

import {SignInForm} from "@/components";
import Image from "next/image";
import Link from "next/link";
import logo from '../../../../public/assets/logo/PrincpalDourado.png'

export default function SignInPage() {
    return (
        <div className="flex flex-1 flex-col justify-center py-12 sm:px-6 lg:px-8 min-h-svh background-pattern">
            <div className="flex items-center justify-center sm:mx-auto sm:w-full sm:max-w-md">
                <Image
                    alt="Your Company"
                    src={logo}
                    width={150}
                    height={131}
                    priority={true}
                />
            </div>

            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-[480px]">
                <div className="bg-white px-6 py-12 shadow-sm sm:rounded-lg sm:px-12">
                    <SignInForm/>
                    <div className='pt-3 flex justify-center text-md'>
                        <Link href='/auth/sign-up'>
                            Não possui uma conta ainda?
                            <strong> clique aqui</strong>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

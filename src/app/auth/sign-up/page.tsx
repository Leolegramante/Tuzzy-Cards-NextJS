'use client'

import {SignUpForm, VerifyEmailForm} from "@/components";
import {UserDto} from "@/helpers";
import Image from "next/image";
import Link from "next/link";
import {useState} from "react";

import logo from '../../../../public/assets/logo/PrincpalDourado.png'

export default function SignInPage() {
    const [user, setUser] = useState<UserDto>({
        email: '',
        firstName: '',
        lastName: '',
        legacyUser: undefined
    })

    const handleUserChange = (user: UserDto) => {
        setUser(user)
    }

    return (
        <div className="flex flex-1 flex-col justify-center py-12 sm:px-6 lg:px-8 min-h-svh background-pattern">
            <div className="flex items-center justify-center sm:mx-auto sm:w-full sm:max-w-md ">
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
                    {user.legacyUser !== undefined &&
                        <SignUpForm user={user}/>}
                    {user.legacyUser === undefined && <VerifyEmailForm setUserDataAction={handleUserChange}/>}

                    <div className="text-md mt-4 flex justify-center">
                        <Link href="/auth/sign-in">
                            Já possui uma conta? <strong>Entre aqui.</strong>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

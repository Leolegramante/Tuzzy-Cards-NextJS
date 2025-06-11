'use client'

import {getUserSession} from "@/components/Checkout/actions";
import CheckoutInformation from "@/components/Checkout/CheckoutInformation";
import CheckoutShippingOptions from "@/components/Checkout/CheckoutShippingOptions";
import CheckoutSignInForm from "@/components/Checkout/CheckoutSignInForm/CheckoutSignInForm";
import {decryptResponse} from "@/helpers/jwt";
import Link from "next/link";
import {useEffect, useState} from "react";

export function CheckoutDetails() {
    const [userSession, setUserSession] = useState<decryptResponse | false>()
    const [error, setError] = useState<boolean>(false);

    useEffect(() => {
        getUserSession().then((res) => {
            if (res) setUserSession(res);
        })
    }, []);

    const handleSetError = () => {
        setError((prevState) => !prevState);
    }

    return (
        <div>
            {userSession ? (
                <div>
                    <CheckoutShippingOptions errors={error}/>
                    <CheckoutInformation
                        handleSetErrorAction={handleSetError}/>
                </div>
            ) : (
                <div
                    className="bg-white px-6 py-12 mt-4 shadow-sm sm:rounded-lg sm:px-12">
                    <p className='text-md text-principal font-semibold'>Faça login ou se cadastre para continuar</p>
                    <CheckoutSignInForm/>
                    <div className='pt-3 flex justify-center text-md'>
                        <Link href='/auth/sign-up'>
                            Não possui uma conta ainda?
                            <strong> clique aqui</strong>
                        </Link>
                    </div>
                </div>
            )}
        </div>
    )
}
'use client'

import {getUserSession} from "@/components/Checkout/actions";
import CheckoutInformation from "@/components/Checkout/CheckoutInformation";
import CheckoutShippingOptions from "@/components/Checkout/CheckoutShippingOptions";
import CheckoutSignInForm from "@/components/Checkout/CheckoutSignInForm/CheckoutSignInForm";
import {CreateOrderSuccessModal} from "@/components/Checkout/Modals";
import {OrderDto} from "@/helpers";
import {decryptResponse} from "@/helpers/jwt";
import {useCartStore} from "@/store/useCartStore";
import Link from "next/link";
import {redirect} from "next/navigation";
import {useEffect, useState} from "react";

export function CheckoutDetails() {
    const [userSession, setUserSession] = useState<decryptResponse | false>()
    const [isCreateOrderSuccessModalOpen, setIsCreateOrderSuccessModalOpen] = useState<boolean>(false);
    const [orderCreated, setOrderCreated] = useState<OrderDto | null>(null);
    const {cleanCart} = useCartStore();

    useEffect(() => {
        getUserSession().then((res) => {
            if (res) setUserSession(res);
        })
    }, []);

    const handleCreateOrderSuccessModalOpen = () => {
        if (isCreateOrderSuccessModalOpen) {
            cleanCart()
            redirect('/')
        }
        setIsCreateOrderSuccessModalOpen((prevState) => !prevState);
    }

    const handleOrderCreated = (order: OrderDto) => {
        setOrderCreated(order)
    }

    return (
        <div>
            {userSession ? (
                <div>
                    <CheckoutShippingOptions/>
                    <CheckoutInformation onCheckoutAction={handleCreateOrderSuccessModalOpen}
                                         onOderCreatedAction={handleOrderCreated}/>
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
            {isCreateOrderSuccessModalOpen && orderCreated && (
                <CreateOrderSuccessModal isOpen={isCreateOrderSuccessModalOpen}
                                         onClose={handleCreateOrderSuccessModalOpen} order={orderCreated}/>
            )}
        </div>
    )
}
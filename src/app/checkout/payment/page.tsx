'use client'

import {AddressInformation, CheckoutDetails, PageContainer} from "@/components";
import {Address} from "@/helpers";
import {useEffect, useState} from "react";
import {getUserAddress} from "./actions";

export default function CheckOutPage() {
    const [addresses, setAddresses] = useState<Address[]>([]);

    const fetchAddress = async () => {
        return await getUserAddress()
    }

    useEffect(() => {
        fetchAddress().then((res) => {
            if (res) {
                setAddresses(res)
            }
        })
    }, []);
    return (
        <PageContainer>
            <h2 className="sr-only">Checkout</h2>
            <div className="lg:grid lg:grid-cols-2 lg:gap-x-12 xl:gap-x-8">
                <AddressInformation addresses={addresses}/>
                <div>
                    <CheckoutDetails/>
                </div>
            </div>
        </PageContainer>

    )
}
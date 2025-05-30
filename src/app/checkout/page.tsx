'use client'

import {CheckoutDetails, CheckoutItems, PageContainer} from "@/components";

export default function CheckOutPage() {

    return (
        <PageContainer>
            <h2 className="sr-only">Checkout</h2>
            <div className="lg:grid lg:grid-cols-2 lg:gap-x-12 xl:gap-x-8">
                <CheckoutItems/>
                <div>
                    <CheckoutDetails/>
                </div>
            </div>
        </PageContainer>

    )
}
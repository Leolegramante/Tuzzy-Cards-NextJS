import {AddressInformation, OrderSummary, PageContainer, PaymentInformation} from "@/components";
import {revalidatePath} from "next/cache";
import {getUserAddress} from "./actions";

export default async function CheckOutPage() {
    const addresses = await getUserAddress() || [];

    async function refreshAddresses() {
        'use server'
        revalidatePath('/checkout'); // Atualiza a página atual
    }

    return (
        <PageContainer>
            <h2 className="sr-only">Payment</h2>
            <div className="lg:grid lg:grid-cols-2 lg:gap-x-12 xl:gap-x-8">
                <div>
                    <AddressInformation addresses={addresses} onUserCreatedAction={refreshAddresses}/>
                    <PaymentInformation/>
                </div>
                <OrderSummary/>
            </div>
        </PageContainer>
    );
}


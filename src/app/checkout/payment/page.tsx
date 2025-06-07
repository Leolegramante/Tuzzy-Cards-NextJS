import {AddressInformation, PageContainer} from "@/components";
import {revalidatePath} from "next/cache";
import {Suspense} from "react";
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
                <Suspense fallback={<AddressInformationSkeleton/>}>
                    <AddressInformation addresses={addresses} onUserCreatedAction={refreshAddresses}/>
                </Suspense>
            </div>
        </PageContainer>
    );
}

function AddressInformationSkeleton() {
    return (
        <div className="space-y-4">
            <div className="bg-white px-6 py-4 mt-4 shadow-sm sm:rounded-lg sm:px-12">
                <div className="animate-pulse">
                    <div
                        className="h-7 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 rounded-md mb-6 w-64 animate-[shimmer_1.5s_ease-in-out_infinite] bg-[length:200%_100%]"></div>
                </div>

                <div className="space-y-4">
                    {[1, 2].map((item) => (
                        <div key={item} className="relative flex items-start animate-pulse">
                            <div className="flex h-6 items-center">
                                <div
                                    className="size-4 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 rounded-full animate-[shimmer_1.5s_ease-in-out_infinite] bg-[length:200%_100%]"></div>
                            </div>

                            <div className="ml-3 flex-1 space-y-2">
                                <div
                                    className="h-5 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 rounded w-48 animate-[shimmer_1.5s_ease-in-out_infinite] bg-[length:200%_100%]"></div>
                                <div
                                    className="h-4 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 rounded w-80 animate-[shimmer_1.5s_ease-in-out_infinite] bg-[length:200%_100%]"></div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="pt-4 animate-pulse">
                    <div
                        className="h-4 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 rounded w-56 animate-[shimmer_1.5s_ease-in-out_infinite] bg-[length:200%_100%]"></div>
                </div>
            </div>
        </div>
    );
}
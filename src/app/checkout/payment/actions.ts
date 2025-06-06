'use server'

import {GetUserAddresses} from "@/service";

export const getUserAddress = async () => {
    const {isValid, address} = await GetUserAddresses()
    if (!isValid || address.length === 0) {
        return false
    }

    return address
}
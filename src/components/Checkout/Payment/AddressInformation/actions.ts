'use server'

import {GetAddressFromZipCode} from "@/service";

export const getAddressFromZipCode = async (uuid: string) => {
    return await GetAddressFromZipCode(uuid);
}
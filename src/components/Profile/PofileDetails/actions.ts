'use server'

import {GetUserProfile} from "@/service";

export const getUserProfile = async () => {
    return await GetUserProfile()
}

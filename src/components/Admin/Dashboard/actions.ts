'use server'

import {CountProducts, CountUsers} from "@/service";

export const getData = async () => {
    const users = await CountUsers()
    const {count, amount, totalPrice} = await CountProducts()

    return {users: users.count, products: {count, amount, totalPrice}}
}
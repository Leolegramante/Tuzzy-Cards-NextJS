'use server'

import {PaginationDto, UserDto} from "@/helpers";
import {GetAllUsers} from "@/service";

type GetUsersResponse = {
    users: UserDto[],
    total: number,
    totalPages: number,
}

export const getUsers = async ({page = 1, limit = 10}: PaginationDto): Promise<GetUsersResponse | false> => {
    const offset = (page - 1) * 10
    const response = await GetAllUsers({limit, offset})
    if (response.isValid && typeof response.users !== 'undefined' && typeof response.total !== 'undefined') {
        const totalPages = Math.ceil(response.total / limit)
        return {users: response.users, total: response.total, totalPages}
    }

    return false
}
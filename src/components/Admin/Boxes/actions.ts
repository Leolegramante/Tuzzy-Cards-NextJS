'use server'

import {PaginationDto} from "@/helpers";
import {GetAllBoxes} from "@/service";

export async function getAllBoxes({
                                      page = 1,
                                      limit = 10,
                                      sortBy = 'createdAt',
                                      order = 'desc'
                                  }: PaginationDto) {
    const offset = (page - 1) * 10
    return await GetAllBoxes({limit, offset, sortBy, order})
}
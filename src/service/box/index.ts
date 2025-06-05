'use server'

import {
    BoxDto,
    CreateBoxResponseDto,
    EditBoxResponseDto,
    GetAllBoxesResponseDto,
    getJWT,
    getSession,
    PaginationDto
} from "@/helpers";

export async function GetAllBoxes({
                                      limit = 10,
                                      offset = 0,
                                      sortBy = 'createdAt',
                                      order = 'asc',
                                  }: PaginationDto): Promise<GetAllBoxesResponseDto> {
    const session = await getSession()
    if (!session) return {isValid: false, message: 'Error', boxes: []}

    const token = await getJWT()
    if (!token) return {isValid: false, message: 'Error', boxes: []}

    const response = await fetch(`${process.env.BASE_URL}/box?limit=${limit}&offset=${offset}&sortBy=${sortBy}&order=${order}`, {
        method: "GET",
        headers: {
            Accept: "application/json",
            'Authorization': `Bearer ${token}`,
            "Content-Type": "application/json",
        },
    });

    if (!response.ok) {
        return {boxes: [], isValid: false, message: `${response.status}`};
    }

    const responseData = await response.json();
    if (responseData.isValid) {
        return responseData;
    }

    return {boxes: [], isValid: false, message: `${response.status}`};
}

export async function CreateBox(box: BoxDto): Promise<CreateBoxResponseDto> {
    const session = await getSession()
    if (!session) return {isValid: false, message: 'Error',}

    const token = await getJWT()
    if (!token) return {isValid: false, message: 'Error',}
    console.log(box)
    const response = await fetch(`${process.env.BASE_URL}/box`, {
        method: "POST",
        headers: {
            Accept: "application/json",
            'Authorization': `Bearer ${token}`,
            "Content-Type": "application/json",
        },
        body: JSON.stringify(box),
    })

    if (!response.ok) {
        return {isValid: false, message: `${response.status}`};
    }

    const responseData: CreateBoxResponseDto = await response.json();
    if (responseData.isValid) {
        return responseData;
    }

    return {isValid: false, message: `${response.status}`};
}

export async function EditBox(box: BoxDto): Promise<EditBoxResponseDto> {
    const session = await getSession()
    if (!session) return {isValid: false, message: 'Error',}

    const token = await getJWT()
    if (!token) return {isValid: false, message: 'Error',}
    console.log(box)
    const response = await fetch(`${process.env.BASE_URL}/box/${box.id}`, {
        method: "PATCH",
        headers: {
            Accept: "application/json",
            'Authorization': `Bearer ${token}`,
            "Content-Type": "application/json",
        },
        body: JSON.stringify(box),
    })

    if (!response.ok) {
        return {isValid: false, message: `${response.status}`};
    }

    const responseData: EditBoxResponseDto = await response.json();
    if (responseData.isValid) {
        return responseData;
    }

    return {isValid: false, message: `${response.status}`};
}
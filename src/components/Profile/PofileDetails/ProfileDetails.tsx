'use client'

import {FetchError, LoadingData} from "@/components";
import {UserProfileDto} from "@/helpers";
import {useEffect, useState} from "react";
import {getUserProfile} from "./actions";
import {ProfileForm} from "./ProfileForm";

export function ProfileDetails() {
    const [user, setUser] = useState<UserProfileDto | null>(null)
    const [isloading, setisloading] = useState<boolean>(false)
    const [error, setError] = useState<boolean>(false)

    useEffect(() => {
        setisloading(true)
        const fetchData = async () => {
            return getUserProfile()
        }
        fetchData().then((data) => {
            if (data.isValid && data.user) {
                setUser(data.user)
                setisloading(false)
            } else {
                setisloading(false)
                setError(true)
            }
        })
    }, [])
    return (
        <div
            className='col-span-2 flex flex-col items-center justify-between border-r rounded-lg border-gray-200 bg-white p-6 h-fit'>
            {!isloading && user && <ProfileForm user={user}/>}
            {!isloading && error && (<FetchError/>)}
            {isloading && (<LoadingData/>)}
        </div>
    )
}
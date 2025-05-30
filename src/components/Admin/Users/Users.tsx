'use client'

import {FetchError, LoadingData, PageHeadings} from "@/components";
import {getUsers} from "@/components/Admin/Users/actions";
import {EditUserModal} from "@/components/Admin/Users/Modals";
import {UsersTable} from "@/components/Admin/Users/UsersTable/UsersTable";
import {UserDto} from "@/helpers";
import {useEffect, useState} from "react";

export const UsersAdminTable = ({currentPage, limit}: { currentPage: number, limit: number }) => {
    const [users, setUsers] = useState<UserDto[]>([]);
    const [totalUsers, setTotalUsers] = useState<number>(0)
    const [totalPages, setTotalPages] = useState<number>(0)
    const [isloading, setisloading] = useState<boolean>(false)
    const [error, setError] = useState<boolean>(false)
    const [selectedUser, setSelectedUser] = useState<UserDto | null>(null)
    const [isEditModalOpen, setIsEditModalOpen] = useState(false)

    useEffect(() => {
        setisloading(true)

        const fetchData = async () => {
            return await getUsers({
                page: currentPage,
                limit
            })
        }

        fetchData().then((data) => {
            if (data !== false) {
                setUsers(data.users)
                setTotalUsers(data.total)
                setTotalPages(data.totalPages)
                setisloading(false)
            } else {
                setError(data)
                setisloading(false)
            }
        }).catch(() => {
            setError(true)
            setisloading(false)
        })
    }, [isEditModalOpen, currentPage, limit]);

    const handleSelectUser = (user: UserDto) => {
        setSelectedUser(user)
        handleEditModalOpen()
    }

    const handleEditModalOpen = () => {
        setIsEditModalOpen((prevState) => !prevState)
    }

    return (
        <div className="flex grow flex-col gap-y-2 rounded-lg bg-white p-6 text-principal">
            <PageHeadings label={"Usuários"}/>
            {error && !isloading && (
                <FetchError/>
            )}
            {isloading && (
                <LoadingData/>
            )}
            {!isloading && !error && (
                <UsersTable users={users} selectUserAction={handleSelectUser} totalPages={totalPages}
                            currentPage={currentPage} totalUsers={totalUsers}/>
            )}
            {isEditModalOpen && selectedUser !== null && (
                <EditUserModal user={selectedUser} isOpen={isEditModalOpen} onCloseAction={handleEditModalOpen}/>
            )}
        </div>
    )
}
"use client"

import {Pagination} from "@/components";
import {UserDto} from "@/helpers";

interface UsersTableProps {
    users: UserDto[];
    selectUserAction: (user: UserDto) => void;
    totalPages: number;
    currentPage: number;
    totalUsers: number;
}

export const UsersTable = ({users, selectUserAction, totalPages, currentPage, totalUsers}: UsersTableProps) =>
    (
        <>
            <table className="min-w-full divide-y divide-gray-300">
                <thead>
                <tr>
                    <th scope="col" className="py-3.5 pr-3 pl-2 text-left text-sm font-semibold text-gray-900">
                        Nome
                    </th>
                    <th scope="col" className="py-3.5 pr-3 pl-2 text-left text-sm font-semibold text-gray-900">
                        Email
                    </th>
                    <th scope="col" className="py-3.5 pr-3 pl-2 text-left text-sm font-semibold text-gray-900">
                        Username
                    </th>
                    <th scope="col" className="py-3.5 pr-3 pl-2 text-left text-sm font-semibold text-gray-900">
                        Role
                    </th>
                    <th scope="col"
                        className="py-3.5 pr-3 pl-2 text-left text-sm font-semibold text-gray-900 flex justify-center">
                        Ativo
                    </th>
                    <th scope="col" className="relative py-3.5 pr-4 pl-3">
                        <span className="sr-only">Edit</span>
                    </th>
                </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                {users.map((user) => (
                    <tr key={user.id}>
                        <td className="py-4 pl-2 text-sm font-medium whitespace-nowrap text-gray-900">
                            {user.firstName} {user.lastName}
                        </td>
                        <td className="py-4 pl-2 text-sm font-medium whitespace-nowrap text-gray-900">
                            {user.email}
                        </td>
                        <td className="py-4 pl-2 text-sm font-medium whitespace-nowrap text-gray-900">
                            {user.username}
                        </td>
                        <td className="py-4 pl-2 text-sm font-medium whitespace-nowrap text-gray-900">
                            {user.role}
                        </td>
                        <td className="py-4 pl-2 text-sm font-medium whitespace-nowrap flex items-center  justify-center">
                         <span
                             className={`inline-block h-3 w-3 rounded-full ${
                                 user.active ? "bg-green-500" : "bg-red-500"
                             }`}
                         />
                        </td>

                        <td className="relative py-4 pr-4 pl-3 text-right text-sm font-medium whitespace-nowrap">
                            <button type="button" className="text-principal cursor-pointer"
                                    onClick={
                                        () => selectUserAction(user)
                                    }>
                                Editar<span className="sr-only">{user.id}</span>
                            </button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
            <div className="mt-4 pt-4 border border-transparent border-t-principal">
                <Pagination totalPages={totalPages} currentPage={currentPage} totalItems={totalUsers}
                            limit={10}
                            label='usuários'/>
            </div>
        </>
    )
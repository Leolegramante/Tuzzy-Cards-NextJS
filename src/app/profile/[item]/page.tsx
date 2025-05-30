'use client'

import {Breadcrumbs, PageContainer, ProfileDetails, ProfileOptionsSidebar} from "@/components";
import {ProfileOrders} from "@/components/Profile/ProfileOrders/PorfileOrders";
import {useParams} from "next/navigation";

const pages = [
    {name: 'Perfil', href: '/profile/me', current: true},
]

const UserDetailPage = () => {
    const {item} = useParams<{ item: string }>()

    return (
        <PageContainer>
            <div className='pl-2 flex flex-col gap-y-2'>
                <Breadcrumbs pages={pages}/>
                <h1 className="text-principal text-2xl font-bold mb-2">Perfil {item} </h1>
                <div className='grid grid-cols-3 gap-4'>
                    <ProfileOptionsSidebar currentPage={item}/>

                    {item === 'me' && (<ProfileDetails/>)}
                    {item === 'my-orders' && (<ProfileOrders/>)}
                </div>
            </div>
        </PageContainer>
    )
}

export default UserDetailPage;
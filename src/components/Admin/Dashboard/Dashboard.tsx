'use client'

import {getData} from "@/components/Admin/Dashboard/actions";
import {DashboardCard} from "@/components/Admin/Dashboard/DashboardCard/DashboardCard";
import {useEffect, useState} from "react";

interface ProductsCount {
    count: number,
    amount: number,
    totalPrice: number
}

export const AdminDashboard = () => {
    const [userCount, setUserCount] = useState<number>(0)
    const [productsCount, setProductsCount] = useState<ProductsCount>({count: 0, amount: 0, totalPrice: 0})
    useEffect(() => {
        const fetchData = async () => {
            return await getData()
        }

        fetchData().then((data) => {
            setUserCount(data.users)
            setProductsCount(data.products)
        })
    }, []);
    return (
        <div className='grid grid-cols-4 gap-6 text-principal'>
            <DashboardCard name='Numero de usuários cadastrados' count={userCount}/>
            <DashboardCard name='total de produtos cadastrados' count={productsCount.count}/>
            <DashboardCard name='Total de produtos em estoque' count={productsCount.amount}/>
            <DashboardCard name='Valor total em produtos' count={productsCount.totalPrice}/>
        </div>
    )
}
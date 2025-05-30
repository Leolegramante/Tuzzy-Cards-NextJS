import {Header} from "@/components";
import {deleteSession, getSession} from "@/helpers";
import {redirect} from "next/navigation";

export default async function AdminLayout({children}: {
    children: React.ReactNode;
}) {
    const session = await getSession();
    const headerSession = session ? {
        uuid: session.uuid,
        firstName: session.firstName,
        lastName: session.lastName,
        email: session.email,
        username: session.username,
        role: session.role,
    } : undefined

    async function logout() {
        'use server'
        await deleteSession();
        redirect('/');
    }

    return <>
        <Header session={headerSession} deleteSessionAction={logout}/>
        {children}
    </>;
}
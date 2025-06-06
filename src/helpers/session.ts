'use server'

import {decrypt} from "@/helpers/jwt";
import {cookies} from "next/headers";

export async function createSession(session: string) {
    const cookie = await cookies();
    const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);

    cookie.set("session", session, {
        httpOnly: true,
        secure: true,
        expires: expiresAt,
    });
}

export async function deleteSession() {
    return (await cookies()).delete("session");
}

export async function getSession() {
    const sessionCookie = (await cookies()).get("session")?.value;
    if (!sessionCookie) {
        return false
    }
    const response = await decrypt(sessionCookie)
    if (!response) {
        await deleteSession()
    }
    return response
}

export async function getJWT() {
    const sessionCookie = (await cookies()).get("session")?.value;

    if (!sessionCookie) {
        return false
    }
    return sessionCookie
}
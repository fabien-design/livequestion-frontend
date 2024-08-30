"use server";

import { cookies } from "next/headers";

export async function handleUpdateToken(token: string): Promise<boolean>
{
    cookies().set({
        name: 'session',
        value: token,
        httpOnly: true,
        path: '/',
    });

    if (cookies().has('session')) {
        return true;
    }
    return false;
}



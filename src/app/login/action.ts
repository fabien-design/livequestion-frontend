"use server";

import { cookies } from "next/headers";

type sessionDataProps = {
    token: string;
};

export async function handleLogin(token: string)
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

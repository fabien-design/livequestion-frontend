"use server";

import { encrypt } from "@/lib";
import { cookies } from "next/headers";

type sessionDataProps = {
    user: {
        id: string;
        username: string;
        email: string;
        avatar: string;
        roles: string[];
    };
    token: string;
};

export async function handleLogin(sessionData: sessionDataProps) {
    const encryptedSessionData = await encrypt(sessionData);
    cookies().set("session", encryptedSessionData, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: 60 * 60 * 24 * 7, // One week
        path: "/",
    });
    // Redirect or handle the response after setting the cookie
}

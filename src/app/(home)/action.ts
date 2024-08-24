"use server"

import { getSession, isTokenExpired, parseJwt } from "@/lib";
import { JwtPayload } from '@/types/jwt';
import { cookies } from "next/headers";

export async function getUserSession(): Promise<JwtPayload | null> {
    const session = await getSession();
    if (!session) return null;
    let token: JwtPayload | null = await parseJwt(session);
    if (await isTokenExpired(token)) {
        token = null;
    }
    return token;
}

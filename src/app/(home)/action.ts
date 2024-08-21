"use server"

import { getSession, parseJwt } from "@/lib";
import { JwtPayload } from '@/types/jwt';

export async function getUserSession(): Promise<JwtPayload | null> {
    const session = await getSession();
    if (!session) return null;
    return parseJwt(session);
}

"use server"

import { decrypt, getSession } from "@/lib";

export async function getUserSession() {
    const session = getSession();
    if (!session) return null;
    return await decrypt(await session);
}

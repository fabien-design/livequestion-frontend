"use server";

import { cookies } from "next/headers";
import { jwtDecode } from "jwt-decode";
import { JwtPayload } from "./types/jwt";

export async function getSession() {
    const token = cookies().get("session")?.value;
    if (!token) {
        return;
    }
    return token;
}

export async function parseJwt(token: string) {
    if (!token) {
        throw new Error("Token is required");
    }

    try {
        // Décoder le token (ne vérifie pas la signature)
        const decoded: JwtPayload = jwtDecode(token);

        return decoded;
    } catch (err) {
        console.error("Failed to verify token:", err);
        throw new Error("Invalid token");
    }
}

export async function isTokenExpired(token: JwtPayload): Promise<boolean> {
    try {
        if (!token.exp) {
            throw new Error("Token does not have an exp field");
        }

        const currentTime = Date.now() / 1000; // Temps actuel en secondes
        return token.exp < currentTime;
    } catch (err) {
        console.error("Failed to decode token:", err);
        return true; // Considérer comme expiré si erreur de décodage
    }
}

export async function customSlugify(text: string): Promise<string> {
    // Remplacer les caractères non désirés par des underscores
    const regex = /[^a-z0-9-]+|(?<![a-z0-9])-+|-(?![a-z0-9])/g;
    const textWithDash = text.replace("-", "---");
    const slug = textWithDash.trim().toLowerCase().replace(regex, "-");

    return slug;
}

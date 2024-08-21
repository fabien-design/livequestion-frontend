"use server"

import { cookies } from "next/headers";
import { jwtDecode } from "jwt-decode"; 
import { JwtPayload } from "./types/jwt";

export async function getSession() {
  const token = cookies().get('session')?.value;
  if (!token) { return; }
  return token;
}


export async function parseJwt(token: string) {
  if (!token) {
    throw new Error("Token is required");
  }

  // Remplacez 'your-256-bit-secret' par votre clé secrète ou public key pour vérifier le token
  const secretOrPublicKey = process.env.JWT_SECRET_KEY || "your-256-bit-secret";

  try {
    // Décoder le token (ne vérifie pas la signature)
    const decoded:JwtPayload  = jwtDecode(token);
    
    return decoded;
  } catch (err) {
    console.error("Failed to verify token:", err);
    throw new Error("Invalid token");
  }
}


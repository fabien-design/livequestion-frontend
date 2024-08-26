"use client";

import { FormEvent, useState } from "react";
import { redirect, useRouter, useSearchParams } from "next/navigation";
import { handleLogin } from "./action";
import { useToast } from "@/components/ui/use-toast"


export default function LoginPage() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const callbackUrl = searchParams.get('callbackUrl') || '/';
    const [error, setError] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const { toast } = useToast();

    async function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();

        const formData = new FormData(event.currentTarget);
        const username = formData.get("email_or_username");
        const password = formData.get("password");
        if (typeof username !== "string" || typeof password !== "string") return;

        try {
            const response = await fetch(
                `${process.env.NEXT_PUBLIC_BACKEND_HOST}/api/login`,
                {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ username, password }),
                }
            );

            if (response.ok) {
                let data = await response.json();
                let isCookieCreated =  await handleLogin(data.token);
                if (isCookieCreated) {
                    router.refresh();
                    router.push(callbackUrl);

                }

            } else {
                // Gestion des erreurs
                let data = await response.json();
                setError(data.message);
                console.log(data.message);
                toast({
                    title: "Login failed",
                    description: data.message,
                    duration: 5000,
                    variant: "destructive",
                });
                setUsername("");
                setPassword("");
            }
        } catch (err) {
            console.error("An error occurred:", err);
            setError("An error occurred while processing your request.");
            toast({
                title: "An error occurred",
                description: "Something went wrong during the login process.",
                duration: 5000,
                variant: "destructive",
            });
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            {error && <div>{error}</div>}
            <input
                type="text"
                name="email_or_username"
                value={username}
                placeholder="Email or Username"
                required
                onChange={(e) => setUsername(e.target.value)}
            />
            <input
                type="password"
                name="password"
                value={password}
                placeholder="Password"
                required
                onChange={(e) => setPassword(e.target.value)}
            />
            <button type="submit">Login</button>
        </form>
        
    );
}

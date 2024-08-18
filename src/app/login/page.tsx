"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { cookies } from "next/headers";
import { handleLogin } from "./action";

export default function LoginPage() {
    const router = useRouter();
    const [error, setError] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    async function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();

        const formData = new FormData(event.currentTarget);
        const username = formData.get("email_or_username");
        const password = formData.get("password");
        if (typeof username !== "string" || typeof password !== "string")
            return;

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
                await handleLogin(data);
                router.push('/')
                
                
            } else {
                // Handle errors
                let data = await response.json();
                setError(data.error);
                console.log(data.error);
                setUsername("");
                setPassword("");
            }
        } catch (err) {
            console.error("An error occurred:", err);
            setError("An error occurred while processing your request.");
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

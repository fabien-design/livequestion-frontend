"use client"

import { FormEvent, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { handleLogin } from "./action";
import { useUser } from "@/context/UserContext"; // Import the context
import MaxWidthWrapper from "@/features/components/MaxWidthWrapper";
import { getUserSession } from "../(home)/action";
import { Suspense } from "react";

export default function LoginPage() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <LoginContent />
        </Suspense>
    );
}

function LoginContent() {
    const router = useRouter();
    const { setUser } = useUser(); // Get the setUser function from context
    const searchParams = useSearchParams();
    const callbackUrl = searchParams.get("callbackUrl") || "/";
    const [error, setError] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

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
                let isCookieCreated = await handleLogin(data.token);
                if (isCookieCreated) {
                    setUser(await getUserSession()); // Update the user context
                    router.push(callbackUrl);
                }
            } else {
                let data = await response.json();
                setError(data.message);
            }
        } catch (err) {
            setError("An error occurred while processing your request.");
        }
    }

    return (
        <MaxWidthWrapper className="flex justify-center items-center pt-[88px] h-full ">
            <div className="max-w-md w-full content-center">
                <div
                    style={{
                        boxShadow:
                            "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
                    }}
                    className="bg-gray-800 rounded-lg shadow-xl overflow-hidden"
                >
                    <div className="p-8">
                        <h2 className="text-center text-3xl font-extrabold text-white">
                            Welcome Back
                        </h2>
                        <p className="mt-4 text-center text-gray-400">
                            Sign in to continue
                        </p>
                        <form
                            onSubmit={handleSubmit}
                            className="mt-8 space-y-6"
                        >
                            {error && <div className="text-red-500 font-semibold">{error}</div>}
                            <div className="rounded-md shadow-sm">
                                <div>
                                    <label className="sr-only" htmlFor="email">
                                        Pseudo
                                    </label>
                                    <input
                                        type="text"
                                        name="email_or_username"
                                        className="appearance-none relative block w-full px-3 py-3 border border-gray-700
                                        bg-gray-700 text-white rounded-md focus:outline-none focus:ring-indigo-500
                                        focus:border-indigo-500 focus:z-10 sm:text-sm"
                                        value={username}
                                        placeholder="Username"
                                        required
                                        onChange={(e) =>
                                            setUsername(e.target.value)
                                        }
                                    />
                                </div>
                                <div className="mt-4">
                                    <input
                                        type="password"
                                        name="password"
                                        className="appearance-none relative block w-full px-3 py-3 border border-gray-700
                                        bg-gray-700 text-white rounded-md focus:outline-none focus:ring-indigo-500
                                        focus:border-indigo-500 focus:z-10 sm:text-sm"
                                        value={password}
                                        placeholder="Password"
                                        required
                                        onChange={(e) =>
                                            setPassword(e.target.value)
                                        }
                                    />
                                </div>
                            </div>
                            <div>
                                <button
                                    type="submit"
                                    className="group relative w-full flex justify-center py-3 px-4 border border-transparent
                            text-sm font-medium rounded-md text-gray-900 bg-indigo-500 hover:bg-indigo-600
                            focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                >
                                    Login
                                </button>
                            </div>
                        </form>
                    </div>
                    <div className="px-8 py-4 bg-gray-700 text-center">
                        <span className="text-gray-400 pr-2">
                            Don`t have an account?
                        </span>
                        <a
                            className="font-medium text-indigo-500 hover:text-indigo-400"
                            href="#"
                            onClick={(e) => {
                                e.preventDefault();
                                router.push(`/register?callbackUrl=${callbackUrl}`);
                            }}
                        >
                            Sign up
                        </a>
                    </div>
                </div>
            </div>
        </MaxWidthWrapper>
    );
}

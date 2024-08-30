"use client";

import { FormEvent, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useUser } from "@/context/UserContext"; // Import the context
import MaxWidthWrapper from "@/features/components/MaxWidthWrapper";
import { handleLogin } from "./action";
import { z } from "zod";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
    FormControl,
    FormField,
    FormItem,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarProps } from "@files-ui/react";

const MAX_FILE_SIZE = 500000;
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/avif"];

const formSchema = () =>
    z
        .object({
            avatar: z
                .instanceof(File)
                .refine(
                    (file) => file.size <= MAX_FILE_SIZE,
                    `Max file size is 5MB.`
                )
                .refine(
                    (file) => ACCEPTED_IMAGE_TYPES.includes(file.type),
                    "Only .jpg, .jpeg, .png and .avif files are accepted."
                )
                .optional(),
            username: z
                .string()
                .min(4, "Username must be at least 4 characters.")
                .max(50, "Max username characters is 50."),
            email: z.string().email("Invalid email address."),
            password: z
                .string()
                .min(8, "Password must be at least 8 characters."),
            confirmPassword: z.string(),
        })
        .superRefine(({ confirmPassword, password }, ctx) => {
            if (confirmPassword !== password) {
                ctx.addIssue({
                    code: "custom",
                    message: "The passwords did not match",
                    path: ["confirmPassword"],
                });
            }
        });

export default function RegisterPage() {
    const router = useRouter();
    const { setUser } = useUser(); // Get the setUser function from context
    const searchParams = useSearchParams();
    const callbackUrl = searchParams.get("callbackUrl") || "/";
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const imageSrc = "/images/default-avatar-icon.jpg";
    const [imageSource, setImageSource] = useState<
        AvatarProps["src"] | undefined
    >(imageSrc);

    const form = useForm<z.infer<ReturnType<typeof formSchema>>>({
        resolver: zodResolver(formSchema()),
        defaultValues: {
            avatar: undefined,
            username: "",
            email: "",
            password: "",
            confirmPassword: "",
        },
    });

    async function onSubmit(values: z.infer<ReturnType<typeof formSchema>>) {
        setLoading(true);
        setError(null);

        try {
            const formData = new FormData();
            formData.append("username", values.username);
            formData.append("email", values.email);
            formData.append("password", values.password);
            console.log(values);
            if (values.avatar) {
                formData.append("avatar", values.avatar); // Ajouter directement l'objet File au FormData
            }

            const response = await fetch(
                `${process.env.NEXT_PUBLIC_BACKEND_HOST}/api/users/new`,
                {
                    method: "POST",
                    body: formData,
                }
            );
            const data = await response.json();
            console.log(data);

            // throw new Error(data.errors);
            if(response.status === 500) {
                setError("Internal server error. Please try again later.");
            }

            if (data.errors) {
                setError(data.errors || "Failed to register. Please try again.");
            }

            // Check if status is 201 and the token exists
            if (response.status === 201 && data?.token) {
                const isFullyLoggedIn = await handleLogin(data.token); // Use the extracted token
                if (isFullyLoggedIn) {
                    setUser(data.user); // Update the user context
                    router.push(callbackUrl);
                }
            }

        } catch (error) {
            console.error("Error submitting post:", error);
            setError("Failed to submit the post. Please try again.");
        } finally {
            setLoading(false);
        }
    }

    async function handleChangeAvatarSrc(selectedFile: File) {
        form.setValue("avatar", selectedFile, { shouldValidate: true });
        setImageSource(selectedFile);
    }

    return (
        <MaxWidthWrapper className="flex justify-center items-center pt-[88px] h-full ">
            <div className="max-w-md w-full content-center ">
                <div
                    style={{
                        boxShadow:
                            "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
                    }}
                    className="bg-gray-800 rounded-lg shadow-xl overflow-hidden"
                >
                    <div className="p-8">
                        <h2 className="text-center text-3xl font-extrabold text-white">
                            Welcome
                        </h2>
                        <p className="mt-4 text-center text-gray-400">
                            Register to continue
                        </p>
                        <FormProvider {...form}>
                            <form
                                onSubmit={form.handleSubmit(onSubmit)}
                                className="space-y-2 pt-10"
                            >
                                <FormField
                                    control={form.control}
                                    name="avatar"
                                    render={({ field }) => (
                                        <FormItem className="w-full flex justify-center pb-3">
                                            <FormControl>
                                                <Avatar
                                                    src={imageSource}
                                                    alt="Avatar"
                                                    variant="circle"
                                                    smartImgFit={"center"}
                                                    style={{ height: "8rem", width: "8rem" }}
                                                    emptyLabel="you can add an avatar"
                                                    changeLabel="Add an avatar (optional)"
                                                    onChange={handleChangeAvatarSrc}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="username"
                                    render={({ field }) => (
                                        <FormItem className="w-full ">
                                            <FormControl>
                                                <Input
                                                    className="appearance-none relative block w-full px-3 py-3 border border-gray-700
                                                    bg-gray-700 text-white rounded-md focus:outline-none focus:ring-indigo-500
                                                    focus:border-indigo-500 focus:z-10 sm:text-sm"
                                                    placeholder="Username"
                                                    type="text"
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="email"
                                    render={({ field }) => (
                                        <FormItem className="w-full ">
                                            <FormControl>
                                                <Input
                                                    type="email"
                                                    className="appearance-none relative block w-full px-3 py-3 border border-gray-700
                                                    bg-gray-700 text-white rounded-md focus:outline-none focus:ring-indigo-500
                                                    focus:border-indigo-500 focus:z-10 sm:text-sm"
                                                    placeholder="Email"
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="password"
                                    render={({ field }) => (
                                        <FormItem className="w-full ">
                                            <FormControl>
                                                <Input
                                                    type="password"
                                                    className="appearance-none relative block w-full px-3 py-3 border border-gray-700
                                                    bg-gray-700 text-white rounded-md focus:outline-none focus:ring-indigo-500
                                                    focus:border-indigo-500 focus:z-10 sm:text-sm"
                                                    placeholder="Password"
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="confirmPassword"
                                    render={({ field }) => (
                                        <FormItem className="w-full ">
                                            <FormControl>
                                                <Input
                                                    type="password"
                                                    className="appearance-none relative block w-full px-3 py-3 border border-gray-700
                                                    bg-gray-700 text-white rounded-md focus:outline-none focus:ring-indigo-500
                                                    focus:border-indigo-500 focus:z-10 sm:text-sm"
                                                    placeholder="Password"
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                {error && (
                                    <p className="text-red-500">{error}</p>
                                )}
                                <Button
                                    type="submit"
                                    className="group relative w-full flex justify-center py-3 px-4 border border-transparent
                            text-sm font-medium rounded-md text-gray-900 bg-indigo-500 hover:bg-indigo-600
                            focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                    disabled={loading}
                                >
                                    {loading ? "Submitting..." : "Submit"}
                                </Button>
                            </form>
                        </FormProvider>
                    </div>
                    <div className="px-8 py-4 bg-gray-700 text-center">
                        <span className="text-gray-400 pr-2">
                            Already have an account?
                        </span>
                        <a
                            className="font-medium text-indigo-500 hover:text-indigo-400"
                            href="#"
                            onClick={(e) => {
                                e.preventDefault();
                                router.push("/login");
                            }}
                        >
                            Sign in
                        </a>
                    </div>
                </div>
            </div>
        </MaxWidthWrapper>
    );
}

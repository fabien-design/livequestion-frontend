"use client";

import { getUserSession } from "@/app/(home)/action";
import { Button } from "@/components/ui/button";
import {
    FormControl,
    FormField,
    FormItem,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useUser } from "@/context/UserContext";
import { UserDetail, getUserDetail } from "@/features/query/user.query";
import { getSession } from "@/lib";
import { Avatar, AvatarProps } from "@files-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { z } from "zod";
import { handleUpdateToken } from "./action";

const MAX_FILE_SIZE = 500000;
const ACCEPTED_IMAGE_TYPES = [
    "image/jpeg",
    "image/jpg",
    "image/png",
    "image/avif",
];

const formSchema = () =>
    z
        .object({
            _method: z.string().optional(),
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
            // .or(z.literal('')),
            username: z
                .string()
                .min(4, "Username must be at least 4 characters.")
                .max(50, "Max username characters is 50.")
                .optional()
                .or(z.literal("")),
            email: z
                .string()
                .email("Invalid email address.")
                .optional()
                .or(z.literal("")),
            password: z
                .string()
                .min(8, "Password must be at least 8 characters.")
                .optional()
                .or(z.literal("")),
            confirmPassword: z.string().optional().or(z.literal("")),
        })
        .superRefine(({ confirmPassword, password }, ctx) => {
            if (confirmPassword && password) {
                if (confirmPassword !== password) {
                    ctx.addIssue({
                        code: "custom",
                        message: "The passwords did not match",
                        path: ["confirmPassword"],
                    });
                }
            }
            if (password && !confirmPassword) {
                ctx.addIssue({
                    code: "custom",
                    message: "Please confirm your password",
                    path: ["confirmPassword"],
                });
            }
        });

export default function UserUpdateForm() {
    const { user, setUser } = useUser();
    const [token, setToken] = useState<string | undefined>(undefined);
    const router = useRouter();
    const [userDetails, setUserDetails] = useState<UserDetail | undefined>();
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [imageSource, setImageSource] = useState<
        AvatarProps["src"] | undefined
    >("/images/default-avatar-icon.jpg");
    const [userHaveAnAvatar, setUserHaveAnAvatar] = useState<boolean>(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                if (user) {
                    setUserDetails(await getUserDetail(user!.username));
                    setToken(await getSession());
                }
            } catch (error) {
                // Handle error here
                console.error(error);
            }
        };
        fetchData();
    }, [user]);

    useEffect(() => {
        if (userDetails) {
            setImageSource(
                userDetails.avatar.name
                    ? `${process.env.NEXT_PUBLIC_BACKEND_HOST}${process.env.NEXT_PUBLIC_IMAGES_PATH}${userDetails.avatar.name}`
                    : "/images/default-avatar-icon.jpg"
            );
            setUserHaveAnAvatar(userDetails.avatar.name ? true : false);
        }
    }, [userDetails]);

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
        if (Object.keys(values).length > 0) {
            setLoading(true);
            setError(null);
            const formData = new FormData();
            if (userDetails?.avatar?.id) {
                formData.append("avatar", userDetails.avatar.id.toString());
            }

            if (values.avatar !== undefined) {
                formData.append("avatar", values.avatar);
            }
            if (
                values.username !== userDetails?.username &&
                values.username !== undefined &&
                values.username !== ""
            ) {
                formData.delete("username");
                formData.append("username", values.username);
            }
            if (
                values.email !== userDetails?.email &&
                values.email !== undefined &&
                values.email !== ""
            ) {
                formData.delete("email");
                formData.append("email", values.email);
            }
            if (values.password && values.password !== "") {
                formData.append("password", values.password);
            }

            try {
                const response = await fetch(
                    `${process.env.NEXT_PUBLIC_BACKEND_HOST}/api/users/${
                        user!.username
                    }`,
                    {
                        method: "POST",
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                        body: formData,
                    }
                );

                if (response.ok) {
                    const data = await response.json();
                    setToken(data.token);
                    handleUpdateToken(data.token);
                    setUser(await getUserSession());
                    router.refresh();
                } else {
                    const errorData = await response.json();
                    console.log(errorData.errors);
                    setError(errorData.errors || "Une erreur est survenue.");
                }
            } catch (error) {
                console.error("Error updating user:", error);
                setError("An error occurred. Please try again later.");
            } finally {
                setLoading(false);
            }
        }
    }

    async function handleChangeAvatarSrc(selectedFile: File) {
        form.setValue("avatar", selectedFile, { shouldValidate: true });
        setImageSource(selectedFile);
    }

    return (
        <FormProvider {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-2 pt-10"
                method="POST"
            >
                <FormField
                    control={form.control}
                    name="_method"
                    render={({ field }) => (
                        <FormItem className="w-full ">
                            <FormControl>
                                <Input
                                    value={"PUT"}
                                    type="hidden"
                                    // {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
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
                                    changeLabel={`${
                                        userHaveAnAvatar ? "Change" : "Add an"
                                    } avatar (optional)`}
                                    onChange={handleChangeAvatarSrc}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <div className="flex flex-col md:flex-row justify-evenly gap-8">
                    <div className="flex flex-col gap-4 w-full">
                        <FormField
                            control={form.control}
                            name="username"
                            render={({ field }) => (
                                <FormItem className="w-full ">
                                    <FormControl>
                                        <Input
                                            className="appearance-none relative block w-full px-3 py-3 border border-gray-300
                                bg-gray-200 text-black rounded-md focus:outline-none focus:ring-indigo-500
                                focus:border-indigo-500 focus:z-10 sm:text-sm"
                                            placeholder="Username"
                                            type="text"
                                            required={false}
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
                                            className="appearance-none relative block w-full px-3 py-3 border border-gray-300
                                bg-gray-200 text-black rounded-md focus:outline-none focus:ring-indigo-500
                                focus:border-indigo-500 focus:z-10 sm:text-sm"
                                            placeholder="Email"
                                            required={false}
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                    <div className="flex flex-col gap-4 w-full">
                        <FormField
                            control={form.control}
                            name="password"
                            render={({ field }) => (
                                <FormItem className="w-full ">
                                    <FormControl>
                                        <Input
                                            type="password"
                                            className="appearance-none relative block w-full px-3 py-3 border border-gray-300
                                bg-gray-200 text-black rounded-md focus:outline-none focus:ring-indigo-500
                                focus:border-indigo-500 focus:z-10 sm:text-sm"
                                            placeholder="Password"
                                            required={false}
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
                                            className="appearance-none relative block w-full px-3 py-3 border border-gray-300
                                bg-gray-200 text-black rounded-md focus:outline-none focus:ring-indigo-500
                                focus:border-indigo-500 focus:z-10 sm:text-sm"
                                            placeholder="Confirm Password"
                                            required={false}
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                </div>

                {error && <p className="text-red-500">{error}</p>}
                <Button
                    type="submit"
                    className="group relative w-full flex justify-center py-3 px-4 border border-transparent
        text-sm font-medium rounded-mdbg-primary/90 hover:bg-primary/100
        focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary text-white"
                    disabled={loading}
                >
                    {loading ? "Submitting..." : "Submit"}
                </Button>
            </form>
        </FormProvider>
    );
}

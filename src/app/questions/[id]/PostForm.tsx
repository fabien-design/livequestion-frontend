"use client";

import React, { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";
import { z } from "zod";
import { FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useRouter } from "next/navigation";
import { getSession } from "@/lib";
import { revalidatePath } from "next/cache";

// Schema for form validation
const formSchema = z.object({
    content: z.string().min(2, "Content must be at least 2 characters.").max(512, "Max content characters is 512"),
});

const PostForm = ({ questionId }: { questionId: string | number }) => {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            content: "",
        },
    });

    async function onSubmit(values: z.infer<typeof formSchema>) {
        const token = await getSession();

        if (!token) {
            setError("User is not authenticated");
            return;
        }

        setLoading(true);
        setError(null);

        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_HOST}/api/answers/new`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({ ...values, questionId }), // Include questionId in the request body
            });

            if (!response.ok) {
                throw new Error("Network response was not ok.");
            }

            // await new Promise((resolve) => setTimeout(resolve, 1000));
            form.reset();
            router.refresh();

        } catch (error) {
            console.error("Error submitting post:", error);
            setError("Failed to submit the post. Please try again.");
        } finally {
            setLoading(false);
        }
    }

    return (
        <FormProvider {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <FormField
                    control={form.control}
                    name="content"
                    render={({ field }) => (
                        <FormItem>
                            <FormControl>
                                <Textarea placeholder="Write your message here..." {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                {error && <p className="text-red-500">{error}</p>}
                <Button type="submit" disabled={loading}>
                    {loading ? "Submitting..." : "Submit"}
                </Button>
            </form>
        </FormProvider>
    );
};

export default PostForm;

import React, { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";
import { z } from "zod";
import {
    FormControl,
    FormField,
    FormItem,
    FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useRouter } from "next/navigation";
import { getSession } from "@/lib";
import FileUploadModal from "@/features/components/FileUploadModal";
import {
    Select,
    SelectTrigger,
    SelectValue,
    SelectContent,
    SelectItem,
} from "@/components/ui/select";
import { Category } from "@/features/query/category.query";

const formSchema = (categories: Category[]) =>
    z.object({
        category: z
            .string()
            .refine((value) => categories.some((cat) => cat.id.toString() === value), {
                message: "Invalid category selected.",
            }),
        content: z
            .string()
            .min(2, "Content must be at least 2 characters.")
            .max(512, "Max content characters is 512"),
        file: z.any().optional(), // Accepter tout type ici pour gérer le fichier correctement
    });

const PostForm = ({ categories }: { categories: Category[] }) => {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const form = useForm<z.infer<ReturnType<typeof formSchema>>>({
        resolver: zodResolver(formSchema(categories)),
        defaultValues: {
            category: "",
            content: "",
        },
    });

    async function onSubmit(values: z.infer<ReturnType<typeof formSchema>>) {
        const token = await getSession();

        if (!token) {
            setError("User is not authenticated");
            return;
        }

        setLoading(true);
        setError(null);

        try {
            const formData = new FormData();
            formData.append("content", values.content);
            formData.append("categoryId", values.category);

            if (values.file) {
                formData.append("file", values.file); // Ajouter directement l'objet File au FormData
            }

            const response = await fetch(
                `${process.env.NEXT_PUBLIC_BACKEND_HOST}/api/questions/new`,
                {
                    method: "POST",
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                    body: formData,
                }
            );

            if (!response.ok) {
                throw new Error("Network response was not ok.");
            }

            form.reset();
            router.push(`/questions/`);
        } catch (error) {
            console.error("Error submitting post:", error);
            setError("Failed to submit the post. Please try again.");
        } finally {
            setLoading(false);
        }
    }

    return (
        <>
            <FormProvider {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-2 pt-10"
                >
                    <FormField
                        control={form.control}
                        name="category"
                        render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <Select
                                        onValueChange={field.onChange}
                                        defaultValue={field.value}
                                    >
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Choisissez la catégorie qui correspond le plus" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            {categories.map((c) => (
                                                <SelectItem
                                                    key={c.id}
                                                    value={c.id.toString()}
                                                >
                                                    {c.name}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <div className="flex gap-4">
                        <FormField
                            control={form.control}
                            name="content"
                            render={({ field }) => (
                                <FormItem className="w-full ">
                                    <FormControl>
                                        <Textarea
                                            className="basis-full bg-gray-200"
                                            placeholder="Write your message here..."
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FileUploadModal />
                    </div>
                    {error && <p className="text-red-500">{error}</p>}
                    <Button type="submit" disabled={loading}>
                        {loading ? "Submitting..." : "Submit"}
                    </Button>
                </form>
            </FormProvider>
        </>
    );
};

export default PostForm;

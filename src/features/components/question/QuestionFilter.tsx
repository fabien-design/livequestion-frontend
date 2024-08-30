"use client"

import React, { useEffect, useState } from "react";
import { z } from "zod";
import { Category } from "@/features/query/category.query";
import { AuthorUndetailed } from "@/features/query/author.query";
import { FormProvider, useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
    FormField,
    FormItem,
    FormControl,
    FormMessage,
    FormLabel,
} from "@/components/ui/form";
import { useRouter, useSearchParams } from "next/navigation";
import { usePathname } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/components/ui/command";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import slugify from "slugify";
import striptags from "striptags";
import { customSlugify } from "@/lib";

function unSlug(text: string): string {
    return text.replace(/(?<!-)-(?!-)/g, " ");
}

const formSchema = (categories: Category[], authors: AuthorUndetailed[]) =>
    z.object({
        title: z
            .string()
            .toLowerCase()
            .trim()
            .max(255, { message: "Le nombre de caractère max est 255" })
            .optional(),
        category: z
            .string()
            .refine(
                (value) =>
                    value === "" ||
                    categories.some((cat) => cat.id.toString() === value),
                {
                    message: "Invalid category selected.",
                }
            ),
        author: z
            .string()
            .refine(
                (value) =>
                    value === "" ||
                    authors.some((auth) => auth.username === value),
                {
                    message: "Invalid author selected.",
                }
            ),
    });

type QuestionFilterProps = {
    categories: Category[];
    authors: AuthorUndetailed[];
};

export const QuestionFilter = ({
    categories,
    authors,
}: QuestionFilterProps) => {
    const router = useRouter();
    const currentPage = usePathname();
    const searchParams = useSearchParams();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [openAuthorComboBox, setOpenAuthorComboBox] = useState(false);
    const [openCategoryComboBox, setOpenCategoryComboBox] = useState(false);
    let defaultTitle =
        searchParams.get("title") && unSlug(searchParams.get("title")!);

    const form = useForm<z.infer<ReturnType<typeof formSchema>>>({
        resolver: zodResolver(formSchema(categories, authors)),
        defaultValues: {
            title: defaultTitle || "",
            author: searchParams.get("author") || "",
            category: searchParams.get("category") || "",
        },
    });

    useEffect(() => {
        form.reset({
            title: searchParams.get("title") || "",
            author: searchParams.get("author") || "",
            category: searchParams.get("category") || "",
        });
    }, [searchParams, form]);

    async function onSubmit(values: z.infer<ReturnType<typeof formSchema>>) {
        setLoading(true);
        setError(null);

        try {
            const searchParams = new URLSearchParams();

            // add filters to the url
            if (values.title) {
                searchParams.set(
                    "title",
                    await customSlugify(striptags(values.title))
                );
            }
            if (values.author) {
                searchParams.set("author", values.author);
            }
            if (values.category) {
                searchParams.set("category", values.category);
            }

            // create url with these query parameters
            const newUrl = `${currentPage}?${searchParams.toString()}`;
            router.push(newUrl);
        } catch (error) {
            setError("Error submitting the form");
        } finally {
            setLoading(false);
        }
    }

    return (
        <>
            <div className="p-8 border-2 rounded-2xl bg-gray-100">
                <FormProvider {...form}>
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="space-y-3"
                    >
                        <FormField
                            control={form.control}
                            name="title"
                            render={({ field }) => (
                                <FormItem className="w-full ">
                                    <FormLabel htmlFor="title">Titre de la question</FormLabel>
                                    <FormControl>
                                        <Input
                                            className="basis-full bg-white"
                                            type="text"
                                            placeholder=""
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <div className="grid sm:flex gap-4 w-full ">
                            <FormField
                                control={form.control}
                                name="author"
                                render={({ field }) => (
                                    <FormItem className="grid w-full">
                                        <FormLabel htmlFor="author" className="pl-[0.25px]">Auteur</FormLabel>
                                        <FormControl >
                                            <Popover
                                                open={openAuthorComboBox}
                                                onOpenChange={
                                                    setOpenAuthorComboBox
                                                }
                                            >
                                                <PopoverTrigger asChild>
                                                    <Button
                                                        variant="outline"
                                                        role="combobox"
                                                        aria-expanded={
                                                            openAuthorComboBox
                                                        }
                                                        className="w-full justify-between"
                                                    >
                                                        {field.value
                                                            ? authors.find(
                                                                  (author) =>
                                                                      author.username ===
                                                                      field.value
                                                              )?.username
                                                            : "Select author..."}
                                                        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                                    </Button>
                                                </PopoverTrigger>
                                                <PopoverContent className="w-full p-0">
                                                    <Command>
                                                        <CommandInput placeholder="Chercher author..." />
                                                        <CommandList>
                                                            <CommandEmpty>
                                                                Aucun auteur
                                                                trouvé
                                                            </CommandEmpty>
                                                            <CommandGroup>
                                                                <CommandItem
                                                                    onSelect={() => {
                                                                        form.setValue(
                                                                            "author",
                                                                            ""
                                                                        );
                                                                        setOpenAuthorComboBox(
                                                                            false
                                                                        );
                                                                    }}
                                                                    key={
                                                                        "all_authors"
                                                                    }
                                                                    value=""
                                                                >
                                                                    <Check
                                                                        className={cn(
                                                                            "mr-2 h-4 w-4",
                                                                            field.value ===
                                                                                ""
                                                                                ? "opacity-100"
                                                                                : "opacity-0"
                                                                        )}
                                                                    />
                                                                    Tous les
                                                                    auteurs
                                                                </CommandItem>
                                                                {authors.map(
                                                                    (
                                                                        author
                                                                    ) => (
                                                                        <CommandItem
                                                                            key={`author_${author.id}`}
                                                                            value={
                                                                                author.username
                                                                            }
                                                                            onSelect={(
                                                                                currentValue
                                                                            ) => {
                                                                                form.setValue(
                                                                                    "author",
                                                                                    currentValue
                                                                                );
                                                                                setOpenAuthorComboBox(
                                                                                    false
                                                                                );
                                                                            }}
                                                                        >
                                                                            <Check
                                                                                className={cn(
                                                                                    "mr-2 h-4 w-4",
                                                                                    field.value ===
                                                                                        author.username
                                                                                        ? "opacity-100"
                                                                                        : "opacity-0"
                                                                                )}
                                                                            />
                                                                            {
                                                                                author.username
                                                                            }
                                                                        </CommandItem>
                                                                    )
                                                                )}
                                                            </CommandGroup>
                                                        </CommandList>
                                                    </Command>
                                                </PopoverContent>
                                            </Popover>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="category"
                                render={({ field }) => (
                                    <FormItem className="grid w-full">
                                        <FormLabel htmlFor="category" className="pl-[0.25px]">Catégorie</FormLabel>
                                        <FormControl>
                                            <Popover
                                                open={openCategoryComboBox}
                                                onOpenChange={
                                                    setOpenCategoryComboBox
                                                }
                                            >
                                                <PopoverTrigger asChild>
                                                    <Button
                                                        variant="outline"
                                                        role="combobox"
                                                        aria-expanded={
                                                            openCategoryComboBox
                                                        }
                                                        className="w-full justify-between"
                                                    >
                                                        {field.value
                                                            ? categories.find(
                                                                  (category) =>
                                                                      category.id.toString() ===
                                                                      field.value
                                                              )?.name
                                                            : "Selectionner une catégorie..."}
                                                        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                                    </Button>
                                                </PopoverTrigger>
                                                <PopoverContent className="w-full p-0">
                                                    <Command>
                                                        <CommandInput placeholder="Chercher une catégorie..." />
                                                        <CommandList>
                                                            <CommandEmpty>
                                                                Aucune catégorie
                                                                trouvé
                                                            </CommandEmpty>
                                                            <CommandGroup>
                                                                <CommandItem
                                                                    onSelect={() => {
                                                                        form.setValue(
                                                                            "category",
                                                                            ""
                                                                        );
                                                                        setOpenCategoryComboBox(
                                                                            false
                                                                        );
                                                                    }}
                                                                    key={
                                                                        "all_categories"
                                                                    }
                                                                    value=""
                                                                >
                                                                    <Check
                                                                        className={cn(
                                                                            "mr-2 h-4 w-4",
                                                                            field.value ===
                                                                                ""
                                                                                ? "opacity-100"
                                                                                : "opacity-0"
                                                                        )}
                                                                    />
                                                                    Toutes les
                                                                    catégories
                                                                </CommandItem>
                                                                {categories.map(
                                                                    (
                                                                        category
                                                                    ) => (
                                                                        <CommandItem
                                                                            key={`category_${category.id}`}
                                                                            value={
                                                                                category.name
                                                                            }
                                                                            onSelect={() => {
                                                                                form.setValue(
                                                                                    "category",
                                                                                    category.id.toString()
                                                                                );
                                                                                setOpenCategoryComboBox(
                                                                                    false
                                                                                );
                                                                            }}
                                                                        >
                                                                            <Check
                                                                                className={cn(
                                                                                    "mr-2 h-4 w-4",
                                                                                    field.value ===
                                                                                        category.id.toString()
                                                                                        ? "opacity-100"
                                                                                        : "opacity-0"
                                                                                )}
                                                                            />
                                                                            {
                                                                                category.name
                                                                            }
                                                                        </CommandItem>
                                                                    )
                                                                )}
                                                            </CommandGroup>
                                                        </CommandList>
                                                    </Command>
                                                </PopoverContent>
                                            </Popover>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                        {error && <p className="text-red-500">{error}</p>}
                        <Button type="submit" disabled={loading}>
                            {loading ? "Submitting..." : "Submit"}
                        </Button>
                    </form>
                </FormProvider>
            </div>
        </>
    );
};
"use client";

import HorizontalCard from "@/features/components/HorizontalCard";
import MaxWidthWrapper from "@/features/components/MaxWidthWrapper";
import { getQuestions, QuestionHome } from "@/features/query/question.query";
import React, { useEffect, useState } from "react";
import { PaginationComponent } from "@/features/components/PaginationComponent";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { QuestionFilter } from "@/features/components/QuestionFilter";
import { Category, getCategories } from "@/features/query/category.query";
import { AuthorUndetailed, getAuthors } from "@/features/query/author.query";
import { Author } from "@/features/author/Author";
import Loading from "../(home)/loading";

type PaginationData = {
    currentPage: number;
    totalItems: number;
    itemsPerPage: number;
    totalPages: number;
};

const Page = () => {
    const searchParams = useSearchParams();
    const page = parseInt(searchParams.get("page") ?? "1");
    const category = searchParams.get("category") ?? "";
    const author = searchParams.get("author")?? "";
    const pagination = {page: page};

    const [authors, setAuthors] = useState<AuthorUndetailed[] | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [paginationData, setPaginationData] = useState<PaginationData | null>(null);

    useEffect(() => {
        const fetchAuthors = async () => {
            setIsLoading(true);
            try {
                const authors = await getAuthors(pagination);
                if(authors.pagination.totalItems > 0) {
                    setAuthors(authors.items);
                    setPaginationData(authors.pagination);
                }
            } catch (error) {
                console.error("Error fetching authors with API:", error);
            } finally {
                setIsLoading(false);
            }
        }
        fetchAuthors();
    }, [searchParams]);

    return (
        <>
            <MaxWidthWrapper className="pt-20">
                <h2 className="text-3xl font-bold pb-12">Les auteurs</h2>

                <div className="grid grid-cols-1 gap-4 pb-6">
                    {!isLoading ? (
                            authors != null ? (
                                authors.map((author) => (
                                    <Link
                                        href={`/users/${author.id}`}
                                        key={`user_${author.id}`}
                                    >
                                        <Author
                                            author={author}
                                        />
                                    </Link>
                                ))
                            ) : (
                                <p className="text-2xl text-red-500 font-bold text-center">Pas d'auteurs trouvé</p>
                            )
                        ): (
                            <Loading />
                        )
                    }
                </div>

                {paginationData && (
                    <PaginationComponent
                        pagesNumber={paginationData.totalPages}
                        currentPageNumber={paginationData.currentPage}
                        className="py-12"
                    />
                )}
            </MaxWidthWrapper>
        </>
    );
};

export default Page;
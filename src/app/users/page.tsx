"use client";

import HorizontalCard from "@/features/components/HorizontalCard";
import MaxWidthWrapper from "@/features/components/MaxWidthWrapper";
import { getQuestions, QuestionHome } from "@/features/query/question.query";
import React, { useEffect, useState } from "react";
import { PaginationComponent } from "@/features/components/PaginationComponent";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { Category, getCategories } from "@/features/query/category.query";
import { UserDetailed, getAuthors } from "@/features/query/user.query";
import { Author } from "@/features/author/Author";
import Loading from "../(home)/loading";
import { Suspense } from "react";

type PaginationData = {
    currentPage: number;
    totalItems: number;
    itemsPerPage: number;
    totalPages: number;
};

export default function Page() {
    return (
        <Suspense fallback={<Loading />}>
            <UsersContent />
        </Suspense>
    );
}

function UsersContent() {
    const searchParams = useSearchParams();
    const page = parseInt(searchParams.get("page") ?? "1");
    const pagination = {page: page};

    const [authors, setAuthors] = useState<UserDetailed[] | null>(null);
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
            <MaxWidthWrapper className="pt-12">
                <h2 className="text-3xl font-bold pb-12">Les auteurs</h2>

                <div className="grid grid-cols-1 gap-4 pb-6">
                    {!isLoading ? (
                            authors != null ? (
                                authors.map((author) => (
                                    <Link
                                        href={`/users/${author.username}`}
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

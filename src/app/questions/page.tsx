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

type PaginationData = {
    currentPage: number;
    totalItems: number;
    itemsPerPage: number;
    totalPages: number;
};

const QuestionsPage = ({
    searchParams,
}: {
    searchParams: { [key: string]: string | string[] | undefined };
}) => {

    const page = searchParams["page"] ? parseInt(Array.isArray(searchParams["page"]) ? searchParams["page"][0] : searchParams["page"]) : 1;

    const [questions, setQuestions] = useState<QuestionHome[]>([]);
    const [categories, setCategories] = useState<Category[] | null>(null);
    const [authors, setAuthors] = useState<AuthorUndetailed[] | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [paginationData, setPaginationData] = useState<PaginationData | null>(
        null
    );

    useEffect(() => {
        const fetchCategoriesAndAuthors = async () => {
            try {
                const categories = await getCategories();
                setCategories(categories);
                const authors = await getAuthors();
                setAuthors(authors);
            } catch (error) {
                console.error("Error fetching categories and authors with API:", error);
            }
        }
        fetchCategoriesAndAuthors();
        const fetchQuestions = async () => {
            setIsLoading(true);
            try {
                const questionsDataFetched = await getQuestions(page);
                setQuestions(questionsDataFetched.items);
                setPaginationData(questionsDataFetched.pagination);
            } catch (error) {
                console.error("Error fetching questions with API:", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchQuestions();
    }, [page]);

    return (
        <>
            <MaxWidthWrapper className="pt-20">
                <h2 className="text-3xl font-bold pb-12">Les questions</h2>

                <h3 className="text-xl">Filtrer les résultats</h3>
                <div>
                    {categories && authors && (
                        <QuestionFilter
                            categories={categories}
                            authors={authors}
                        />
                    )}
                </div>
                <div className="grid grid-cols-1 gap-4 pb-6">
                    {isLoading ? (
                        <p>Loading...</p>
                    ) : (
                        questions.map((question) => (
                            <Link
                                href={`/questions/${question.id}`}
                                key={`question_${question.id}`}
                            >
                                <HorizontalCard
                                    question={question}
                                />
                            </Link>
                        ))
                    )}
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

export default QuestionsPage;

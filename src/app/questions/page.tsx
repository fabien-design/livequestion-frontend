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

const QuestionsPage = () => {
    const searchParams = useSearchParams();
    const page = parseInt(searchParams.get("page") ?? "1");
    const category = searchParams.get("category") ?? "";
    const author = searchParams.get("author")?? "";

    const [questions, setQuestions] = useState<QuestionHome[]>([]);
    const [categories, setCategories] = useState<Category[] | null>(null);
    const [authors, setAuthors] = useState<AuthorUndetailed[] | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [paginationData, setPaginationData] = useState<PaginationData | null>(null);

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
                const questionsDataFetched = await getQuestions(page, category, author);
                if(questionsDataFetched.pagination.totalItems > 0) {
                    setQuestions(questionsDataFetched.items);
                    setPaginationData(questionsDataFetched.pagination);
                }
            } catch (error) {
                console.error("Error fetching questions with API:", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchQuestions();
    }, [searchParams]);

    return (
        <>
            <MaxWidthWrapper className="pt-20">
                <h2 className="text-3xl font-bold pb-12">Les questions</h2>

                <h3 className="text-xl">Filtrer les résultats</h3>
                <div className="py-10">
                    {categories && authors && (
                        <QuestionFilter
                            categories={categories}
                            authors={authors}
                        />
                    )}
                </div>
                <div className="grid grid-cols-1 gap-4 pb-6">
                    {questions ? (
                            isLoading ? (
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
                            )
                        ): (
                            <p className="text-2xl text-red-500 font-bold text-center">Pas de questions trouvé</p>
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

export default QuestionsPage;

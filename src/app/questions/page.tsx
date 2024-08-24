"use client";

import HorizontalCard from "@/features/components/HorizontalCard";
import MaxWidthWrapper from "@/features/components/MaxWidthWrapper";
import {
    getQuestions,
    QuestionHome,
} from "@/features/query/question.query";
import React, { useEffect, useState } from "react";
import { PaginationComponent } from "@/features/components/PaginationComponent";
import { useSearchParams } from "next/navigation";
import Link from "next/link";

type PaginationData = {
    currentPage: number;
    totalItems: number;
    itemsPerPage: number;
    totalPages: number;
};

const QuestionsPage = () => {
    const searchParams = useSearchParams();
    const page = searchParams.get("page") ? parseInt(searchParams.get("page")!) : 1;

    const [questions, setQuestions] = useState<QuestionHome[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [paginationData, setPaginationData] = useState<PaginationData | null>(null);

    useEffect(() => {
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
                <div className="py-12"></div>
                <div className="grid grid-cols-1 gap-4 pb-6">
                    {isLoading ? (
                        <p>Loading...</p>
                    ) : (
                        questions.map((question) => (
                            <Link href={`/questions/${question.id}`} key={`question_${question.id}`}>
                                <HorizontalCard
                                    question={question}
                                    // key={`question_${question.id}`}
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

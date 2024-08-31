"use client";

import HorizontalCard from "@/features/components/HorizontalCard";
import { PaginationComponent } from "@/features/components/PaginationComponent";
import { Question } from "@/features/components/question/Question";
import HorizontalCardSkeleton from "@/features/components/skeletons/HorizontalCardSkeleton";
import VerticalCard from "@/features/components/VerticalCard";
import { getQuestions, QuestionHome } from "@/features/query/question.query";
import { getUserDetail } from "@/features/query/user.query";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";

type PaginationData = {
    currentPage: number;
    totalItems: number;
    itemsPerPage: number;
    totalPages: number;
};

export const UserQuestionsList = ({ username }: { username: string }) => {
    const [questions, setQuestions] = useState<QuestionHome[]>();
    const [paginationData, setPaginationData] = useState<PaginationData | null>(
        null
    );
    const [loading, setLoading] = useState<boolean>();
    const [error, setError] = useState<string>();
    const searchParams = useSearchParams();
    const page = parseInt(searchParams.get("page") ?? "1");

    useEffect(() => {
        setLoading(true);
        const fetchData = async () => {
            try {
                const questionsData = await getQuestions(
                    page,
                    "",
                    "",
                    username
                );
                setQuestions(questionsData.items);
                setPaginationData(questionsData.pagination);
            } catch (error) {
                // Handle error here
                setError("impossible de récuperer les infos de l'utilisateur");
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    if (loading) {
        return (
            <div className="flex flex-col">
                {Array.from({ length: 2 }).map((_, index) => (
                    <HorizontalCardSkeleton key={`skeleton_question_${index}`} />
                ))}
            </div>
        );
    }

    return (
        <>
            <div className="flex flex-col">
                {questions &&
                    questions.length > 0 &&
                    questions.map((question, index) => (
                        <>
                            <Link
                                href={`/questions/${question.id}`}
                                key={`user_question_${question.id}`}
                                className="w-full mb-4"
                            >
                                <HorizontalCard
                                    question={question}
                                    key={`user_horizontal_question_${question.id}`}
                                    className="hidden md:flex"
                                />
                                <VerticalCard
                                    question={question}
                                    key={`user_vertical_question_${question.id}`}
                                    className="md:hidden mb-4"
                                />
                            </Link>
                            {index < questions.length - 1 && (
                                <hr className="my-4 border-t border-gray-400" />
                            )}
                        </>
                    ))}
            </div>
            {paginationData && (
                <PaginationComponent
                    pagesNumber={paginationData.totalPages}
                    currentPageNumber={paginationData.currentPage}
                    className="py-12"
                />
            )}
        </>
    );
};

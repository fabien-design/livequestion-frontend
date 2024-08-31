"use client";

import HorizontalCard from "@/features/components/HorizontalCard";
import MaxWidthWrapper from "@/features/components/MaxWidthWrapper";
import VerticalCard from "@/features/components/VerticalCard";
import {
    getLatestQuestions,
    getLatestSportQuestions,
    getMostAnsweredQuestion,
    getRandomQuestions,
    QuestionHome,
} from "@/features/query/question.query";
import Link from "next/link";
import { Suspense, useEffect, useState } from "react";
import { Question } from "@/features/components/question/Question";
import { Skeleton } from "@nextui-org/skeleton";
import { getUserSession } from "./action";
import { cookies } from "next/headers";
import { useRouter } from "next/navigation";
import { UserDetailed, getBestAuthors } from "@/features/query/user.query";
import { AuthorPosition } from "@/features/author/AuthorPosition";

// bg-primary/80

export default function Home() {
    const [questions, setQuestions] = useState<QuestionHome[]>([]);
    const [authors, setAuthors] = useState<UserDetailed[]>([]);
    const [latestSportsQuestions, setLatestSportsQuestions] = useState<
        QuestionHome[]
    >([]);
    const [mostAnsweredQuestion, setMostAnsweredQuestion] =
        useState<QuestionHome | null>(null);
    const [randomQuestions, setRandomQuestions] = useState<
        QuestionHome[] | null
    >([]);
    const [isLoaded, setIsLoaded] = useState<boolean>(false);

    useEffect(() => {
        setIsLoaded(true);
        const fetchQuestions = async () => {
            try {
                const mostAnsweredQuestion = await getMostAnsweredQuestion();
                setMostAnsweredQuestion(mostAnsweredQuestion);
                const latestQuestionsData = await getLatestQuestions();
                const latestQuestions = latestQuestionsData.items;
                const authorsData = await getBestAuthors();
                setAuthors(authorsData);
                setQuestions(latestQuestions);
                const sportsQuestions = await getLatestSportQuestions();
                if (sportsQuestions.items.length > 0) {
                    setLatestSportsQuestions(sportsQuestions.items);
                }
                const randomQts = await getRandomQuestions();
                if (randomQts.items.length > 0) {
                    setRandomQuestions(randomQts.items);
                }
                setIsLoaded(false);
            } catch (error) {
                console.error("Error fetching questions with api:", error);
            }

            const user = await getUserSession();
        };

        fetchQuestions();
    }, []);

    return (
        <div className="bg-gray-50 pt-12">
            <section>
                <MaxWidthWrapper className="h-full">
                    <div className="w-full h-full flex justify-center md:block ">
                        {mostAnsweredQuestion && (
                            <Link
                                href={`/questions/${mostAnsweredQuestion.id}`}
                            >
                                <HorizontalCard
                                    question={mostAnsweredQuestion}
                                    isBig={true}
                                    className="hidden md:flex"
                                />
                                <VerticalCard
                                    question={mostAnsweredQuestion}
                                    isBig={true}
                                    className="md:hidden mb-4"
                                />
                            </Link>
                        )}
                    </div>
                </MaxWidthWrapper>
            </section>
            {/* latest questions section */}
            <section className="pt-12">
                <MaxWidthWrapper>
                    <div className="flex justify-between flex-col sm:flex-row">
                        <h2 className="font-semibold text-2xl sm:text-3xl md:text-4xl">
                            Dernieres questions
                        </h2>
                        <Link
                            href="/questions"
                            className="text-primary font-semibold text-lg sm:text-xl md:text-2xl underline underline-offset-2 items-center"
                        >
                            Voir toutes les questions
                        </Link>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:flex justify-center sm:justify-between pt-12 gap-3 md:gap-16 lg:gap-24">
                        {questions.map((q) => (
                            <Question
                                question={q}
                                key={`lts_question_${q.id}`}
                                className="flex justify-center md:block"
                            ></Question>
                        ))}
                    </div>
                </MaxWidthWrapper>
            </section>

            <section className="pt-12">
                <MaxWidthWrapper>
                    <div className="flex justify-between flex-col sm:flex-row">
                        <h2 className="font-semibold text-2xl sm:text-3xl md:text-4xl">
                            Meilleurs auteurs
                        </h2>
                        <Link
                            href="/users"
                            className="text-primary font-semibold text-lg sm:text-xl md:text-2xl underline underline-offset-2 items-center"
                        >
                            Voir tous les auteurs
                        </Link>
                    </div>
                    <div className="flex flex-col justify-center md:flex-row md:justify-between pt-12 gap-6 md:gap-4 lg:gap-24">
                        {authors && (
                            <>
                                {authors[0] && (
                                    <AuthorPosition
                                        author={authors[0]}
                                        position={1}
                                        key={`best_author_${authors[0].id}`}
                                        className="justify-center md:justify-start md:pr-1 lg:pr-2 xl:pr-4"
                                    ></AuthorPosition>
                                )}
                                <div className="grid grid-cols-2 md:flex md:gap-4 md:justify-between md:w-full">
                                    {authors[1] && authors.slice(1).map((a, i) => (
                                        <AuthorPosition
                                            author={a}
                                            position={i + 2}
                                            key={`best_author_${a.id}`}
                                        ></AuthorPosition>
                                    ))}
                                </div>
                            </>
                        )}
                    </div>
                </MaxWidthWrapper>
            </section>
            <section className="pt-12">
                <MaxWidthWrapper>
                    <div className="flex justify-between flex-col sm:flex-row">
                        <h2 className="font-semibold text-2xl sm:text-3xl md:text-4xl">
                            Dans la thématique "Sport"
                        </h2>
                        <Link
                            href="/questions?category=1"
                            className="text-primary font-semibold text-lg sm:text-xl md:text-2xl underline underline-offset-2 items-center"
                        >
                            Voir d'autres questions sur "Sport"
                        </Link>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:flex justify-center sm:justify-between pt-12 gap-3 md:gap-16 lg:gap-24">
                        {latestSportsQuestions &&
                            latestSportsQuestions.map((q, i) => (
                                <Question
                                    question={q}
                                    key={`lts_sport_question_${q.id}`}
                                    className="flex justify-center md:block"
                                ></Question>
                            ))}
                    </div>
                </MaxWidthWrapper>
            </section>
            <section className="pt-12">
                <MaxWidthWrapper>
                    <div>
                        <h2 className="font-semibold text-2xl sm:text-3xl md:text-4xl">
                            Questions aléatoires
                        </h2>
                    </div>
                    <div >
                        {" "}
                        {/* Réduction des gaps */}
                        {randomQuestions && randomQuestions.length > 1 ? (
                            <div className="grid justify-center md:flex md:justify-start items-center py-12 gap-4 md:gap-8 lg:gap-16">
                                <Link
                                    href={`/questions/${randomQuestions[0].id}`}
                                    className="flex justify-center md:block"
                                >
                                    <VerticalCard
                                        question={randomQuestions[0]}
                                        isBig={true}
                                        key={`rdm_question_${randomQuestions[0].id}`}
                                    />
                                </Link>
                                <div className="flex flex-col justify-between gap-4">
                                    {" "}
                                    {/* Ajout d'un gap pour harmoniser l'affichage */}
                                    {randomQuestions.slice(1).map((q) => (
                                        <Question
                                            question={q}
                                            className="flex justify-center md:block md:w-[80%]"
                                            key={`rdm_question_${q.id}`}
                                        />
                                    ))}
                                </div>
                            </div>
                        ) : (
                            <p>No questions found</p>
                        )}
                    </div>
                </MaxWidthWrapper>
            </section>
        </div>
    );
}

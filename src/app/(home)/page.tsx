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
import { QuestionLayout } from "@/features/question/QuestionLayout";
import { Question } from "@/features/question/Question";
import { Skeleton } from "@nextui-org/skeleton";
import { getUserSession } from "./action";
import { cookies } from "next/headers";
import { useRouter } from "next/navigation";
import {
    AuthorUndetailed,
    getBestAuthors,
} from "@/features/query/author.query";
import { AuthorPosition } from "@/features/author/AuthorPosition";

// bg-primary/80

export default function Home() {
    const [questions, setQuestions] = useState<QuestionHome[]>([]);
    const [authors, setAuthors] = useState<AuthorUndetailed[]>([]);
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
                    <div className="w-full h-full ">
                        {mostAnsweredQuestion && (
                            <Link
                                href={`/questions/${mostAnsweredQuestion.id}`}
                            >
                                <HorizontalCard
                                    question={mostAnsweredQuestion}
                                    isBig={true}
                                />
                            </Link>
                        )}
                    </div>
                </MaxWidthWrapper>
            </section>
            {/* latest questions section */}
            <section className="pt-12">
                <MaxWidthWrapper>
                    <div className="flex justify-between">
                        <h2 className="font-semibold text-xl sm:text-3xl md:text-4xl">
                            Dernieres questions
                        </h2>
                        <Link
                            href="/questions"
                            className="text-primary font-semibold text-lg sm:text-xl md:text-2xl underline underline-offset-2 items-center"
                        >
                            Voir toutes les questions
                        </Link>
                    </div>
                    <div className="flex justify-between py-12 gap-12 md:gap-16 lg:gap-24">
                        {questions.map((q) => (
                            <Question
                                question={q}
                                key={`lts_question_${q.id}`}
                            ></Question>
                        ))}
                    </div>
                </MaxWidthWrapper>
            </section>

            <section className="pt-12">
                <MaxWidthWrapper>
                    <div className="flex justify-between">
                        <h2 className="font-semibold text-xl sm:text-3xl md:text-4xl">
                            Meilleurs auteurs
                        </h2>
                        <Link
                            href="/users"
                            className="text-primary font-semibold text-lg sm:text-xl md:text-2xl underline underline-offset-2 items-center"
                        >
                            Voir tous les auteurs
                        </Link>
                    </div>
                    <div className="flex justify-between py-12 gap-12 md:gap-16 lg:gap-24">
                        {authors &&
                            authors.map((a, i) => (
                                <AuthorPosition
                                    author={a}
                                    position={i + 1}
                                    key={`best_author_${a.id}`}
                                ></AuthorPosition>
                            ))}
                    </div>
                </MaxWidthWrapper>
            </section>
            <section className="pt-12">
                <MaxWidthWrapper>
                    <div className="flex justify-between">
                        <h2 className="font-semibold text-xl sm:text-3xl md:text-4xl">
                            Dans la thématique "Sport"
                        </h2>
                        <Link
                            href="/questions?category=1"
                            className="text-primary font-semibold text-lg sm:text-xl md:text-2xl underline underline-offset-2 items-center"
                        >
                            Voir d'autres questions sur "Sport"
                        </Link>
                    </div>
                    <div className="flex justify-between py-12 gap-12 md:gap-16 lg:gap-24">
                        {latestSportsQuestions &&
                            latestSportsQuestions.map((q, i) => (
                                <Question
                                    question={q}
                                    key={`lts_sport_question_${q.id}`}
                                ></Question>
                            ))}
                    </div>
                </MaxWidthWrapper>
            </section>
            <section className="pt-12">
                <MaxWidthWrapper>
                    <div>
                        <h2 className="font-semibold text-xl sm:text-3xl md:text-4xl">
                            Questions aléatoires
                        </h2>
                    </div>
                    <div className="flex justify-start items-center py-12 gap-4 md:gap-8 lg:gap-16">
                        {" "}
                        {/* Réduction des gaps */}
                        {randomQuestions && randomQuestions.length > 1 ? (
                            <>
                                <Link href={`/questions/${randomQuestions[0].id}`}>
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
                                            className='w-[80%]'
                                            key={`rdm_question_${q.id}`}
                                        />
                                    ))}
                                </div>
                            </>
                        ) : (
                            <p>No questions found</p>
                        )}
                    </div>
                </MaxWidthWrapper>
            </section>
        </div>
    );
}

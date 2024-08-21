"use client";

import HorizontalCard from "@/features/components/HorizontalCard";
import MaxWidthWrapper from "@/features/components/MaxWidthWrapper";
import VerticalCard from "@/features/components/VerticalCard";
import {
    getLatestQuestions,
    getMostAnsweredQuestion,
    QuestionHome,
} from "@/features/query/question.query";
import Link from "next/link";
import { Suspense, useEffect, useState } from "react";
import { QuestionLayout } from "@/features/question/QuestionLayout";
import { Question } from "@/features/question/Question";
import { Skeleton } from "@nextui-org/skeleton";
import { getUserSession } from "./action";
import { cookies } from "next/headers";

// bg-primary/80

export default function Home() {
    const [questions, setQuestions] = useState<QuestionHome[]>([]);
    const [mostAnsweredQuestion, setMostAnsweredQuestion] =
        useState<QuestionHome | null>(null);
    const [isLoaded, setIsLoaded] = useState<boolean>(false);


    useEffect(() => {
        setIsLoaded(true);
        const fetchQuestions = async () => {
            try {
                const mostAnsweredQuestion = await getMostAnsweredQuestion();
                setMostAnsweredQuestion(mostAnsweredQuestion);
                const latestQuestions = await getLatestQuestions();
                setQuestions(latestQuestions);
                setIsLoaded(false);
            } catch (error) {
                console.error("Error fetching questions with api:", error);
            }

            const user = await getUserSession();
            if (user) {
                console.log("User", user);
            }
        };
        
        fetchQuestions();
    }, []);
   


    return (
        <div className="bg-gray-50">
            <section>
                <MaxWidthWrapper className="h-full">
                    <div className="w-full h-full ">
                        {mostAnsweredQuestion && (
                            <Link href={`/question/${mostAnsweredQuestion.id}`}>
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
            <section className="py-12">
                <MaxWidthWrapper>
                    <div className="flex justify-between">
                        <h2 className="font-semibold text-xl sm:text-3xl md:text-4xl">
                            Dernieres questions
                        </h2>
                        <Link
                            href="/question"
                            className="text-primary font-semibold text-lg sm:text-xl md:text-2xl underline underline-offset-2 items-center"
                        >
                            Voir toutes les questions
                        </Link>
                    </div>
                    <div className="flex justify-between py-12 gap-12 md:gap-16 lg:gap-24">
                        {questions.map(
                            (q) => (
                                (
                                    <Question
                                        question={q}
                                        key={`lts_question_${q.id}`}
                                    ></Question>
                                )
                            )
                        )}
                    </div>
                </MaxWidthWrapper>
            </section>
        </div>
    );
}

import React, { PropsWithChildren } from "react";
import { QuestionDetails } from "../query/question.query";
import { Avatar } from "@radix-ui/react-avatar";
import { AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import clsx from "clsx";
import VerticalCard from "../components/VerticalCard";
import Link from "next/link";
import { HeartFilledIcon } from "@radix-ui/react-icons";
import { PostHeader } from "../components/PostHeader";
import { Answer } from "../answer/Answer";
import { Textarea } from "@/components/ui/textarea";
import PostForm from "@/app/questions/[id]/PostForm";

type QuestionDetailsProps = PropsWithChildren<{
    question: QuestionDetails;
    className?: string;
}>;

export const QuestionDetailsLayout = ({
    question,
    className,
}: QuestionDetailsProps) => {
    const user = question.author;

    return (
        <>
            <div className={clsx("w-full pt-4 ", className)}>
                <PostHeader
                    propId={question.id}
                    user={user}
                    createdAt={question.createdAt}
                />
                <div className="pt-4 pb-6 ml-4 sm:ml-10">
                    <h2 className="font-semibold text-medium md:text-lg lg:text-2xl">
                        {question.title}
                    </h2>
                    {question.images?.name != null && (
                        <img
                            className="mt-2 rounded-2xl border-2 border-gray-200"
                            alt="img of the question"
                            src={`${process.env.NEXT_PUBLIC_BACKEND_HOST}${process.env.NEXT_PUBLIC_IMAGES_PATH}${question.images?.name}`}
                        />
                    )}
                </div>
            </div>
            <div className="">
                <PostForm />
            </div>
            <div className="py-2">
                {question.answers.length > 0 &&
                    question.answers.map((answer) => {
                        return (
                            // Your code for rendering each answer goes here
                            <Answer
                                key={`answers_${answer.id}`}
                                answer={answer}
                            />
                        );
                    })}
            </div>
        </>
    );
};

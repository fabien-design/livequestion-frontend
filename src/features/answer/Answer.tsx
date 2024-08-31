import React from "react";
import { AnswerDetail } from "../query/answer.query";
import Link from "next/link";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { AvatarFallback } from "@radix-ui/react-avatar";
import { formatDate } from "@/lib/date";
import { PostHeader } from "../components/PostHeader";

type AnswerProps = {
    answer: AnswerDetail;
};

export const Answer = ({ answer }: AnswerProps) => {
    const user = answer.author;

    return (
        <div className="flex w-full flex-col gap-4 bg-gray-200 items-start p-4 border-gray-200 border-b-2">
            <PostHeader
                propId={answer.id}
                user={user}
                createdAt={answer.createdAt}
            />
            <div className="pr-1 sm:pr-2 pl-4 sm:pl-10 flex w-full flex-col gap-2">
                {answer.content}
            </div>
        </div>
    );
};

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

    const AnswerHeader = (
        <Link
            href={`/users/${user.id}`}
            className="flex gap-4 items-center group"
        >
            <Avatar>
                {user.avatar ? (
                    <AvatarImage
                        src={user.avatar}
                        alt="avatar"
                        className="h-12 w-12 rounded-full"
                    />
                ) : null}
                <AvatarFallback>
                    <div className="w-10 h-10 flex items-center justify-center rounded-full bg-blue-700 text-white">
                        {user.username[0]}
                    </div>  
                </AvatarFallback>
            </Avatar>
            <div className="flex justify-between flex-row">
                <p className="items-start flex group-hover:underline group-hover:underline-offset-2 ">
                    <span>{user.username}</span>
                </p>
                {answer.createdAt ? (
                    <p className="text-zinc-500 font-bold">
                        {formatDate(answer.createdAt)}
                    </p>
                ) : null}
            </div>
        </Link>
    );

    return (
        <div className="flex w-full flex-col gap-4 bg-gray-200 items-start p-4 border-gray-200 border-y-2">
            <PostHeader
                propId={answer.id}
                user={user}
                createdAt={answer.createdAt}
            />
            <div className="ml-4 sm:ml-10 flex w-full flex-col gap-2">
                {answer.content}
            </div>
        </div>
    );
};

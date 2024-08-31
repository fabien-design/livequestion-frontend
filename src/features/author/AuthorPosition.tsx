import React from "react";
import { UserDetailed } from "../query/user.query";
import { cn } from "@/lib/utils";
import Link from "next/link";

type AuthorPositionProps = {
    author: UserDetailed;
    position: number;
    className?: string;
};

export const AuthorPosition = ({
    author,
    position,
    className,
}: AuthorPositionProps) => {
    return (
        <div className={cn("flex gap-4 items-center", className)}>
            <span className="text-primary text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-serif font-semibold">
                {position}
            </span>
            <div className="flex flex-col justify-between ">
                <Link
                    href={`/users/${author.username}`}
                    className="text-lg sm:text-xl md:text-2xl lg:text-4xl font-serif font-bold"
                >
                    {author.username}
                </Link>
                <p className="text-md sm:text-lg md:text-xl lg:text-2xl">
                    <span className="text-number_questions_color pr-2 ">
                        {author.questions_count}
                    </span>
                    {author.questions_count && author.questions_count > 1
                        ? `questions`
                        : `question`}
                </p>
            </div>
        </div>
    );
};

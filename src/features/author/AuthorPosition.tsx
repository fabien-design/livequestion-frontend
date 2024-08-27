import React from "react";
import { AuthorUndetailed } from "../query/author.query";

type AuthorPositionProps = {
    author: AuthorUndetailed;
    position: number;
};

export const AuthorPosition = ({ author, position }: AuthorPositionProps) => {
    return (
        <div className="flex gap-4 items-center">
            <span className="text-primary text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-serif font-semibold">
                {position}
            </span>
            <div className="flex flex-col justify-between ">
                <p className="text-lg sm:text-xl md:text-2xl lg:text-4xl font-serif font-bold">
                    {author.username}
                </p>
                <p className="text-md sm:text-lg md:text-xl lg:text-2xl">
                    <span className="text-number_questions_color pr-2 ">{author.questions_count}</span>
                    {author.questions_count && author.questions_count > 1
                        ? `questions`
                        : `question`}
                </p>
            </div>
        </div>
    );
};

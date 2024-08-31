import React from "react";
import { QuestionHome } from "../../query/question.query";
import Link from "next/link";
import VerticalCard from "../VerticalCard";
import { cn } from "@/lib/utils";

type QuestionProps = {
    question: QuestionHome;
    className?: string;
};

export const Question = ({ question, className }: QuestionProps) => {
    return (
        <>
            <Link href={`/questions/${question.id}`} className={cn("w-full mb-4", className)}>
                <VerticalCard question={question}></VerticalCard>
            </Link>
        </>
    );
};

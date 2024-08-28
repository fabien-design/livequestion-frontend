import React from "react";
import { QuestionHome } from "../query/question.query";
import { QuestionLayout } from "./QuestionLayout";
import Link from "next/link";
import VerticalCard from "../components/VerticalCard";
import { cn } from "@/lib/utils";

type QuestionProps = {
    question: QuestionHome;
    className?: string;
};

export const Question = ({ question, className }: QuestionProps) => {
    return (
        <>
            <Link href={`/questions/${question.id}`} className={cn("w-full", className)}>
                <VerticalCard question={question}></VerticalCard>
            </Link>
        </>
    );
};

import React from "react";
import { QuestionHome } from "../query/question.query";
import { QuestionLayout } from "./QuestionLayout";
import Link from "next/link";
import VerticalCard from "../components/VerticalCard";

type QuestionProps = {
    question: QuestionHome;
};

export const Question = ({ question }: QuestionProps) => {
    return (
        <>
            <Link href={`/questions/${question.id}`} className="w-full">
                <VerticalCard question={question}></VerticalCard>
            </Link>
        </>
    );
};

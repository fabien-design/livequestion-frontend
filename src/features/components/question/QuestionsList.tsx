// QuestionsList.tsx (Client Component)
"use client";

import React, { Suspense } from "react";
import Link from "next/link";
import HorizontalCard from "@/features/components/HorizontalCard";
import HorizontalCardSkeleton from "@/features/components/skeletons/HorizontalCardSkeleton";
import { QuestionHome } from "@/features/query/question.query";
import VerticalCard from "../VerticalCard";

type QuestionsListProps = {
  questions: QuestionHome[];
  isLoading: boolean;
};

const QuestionsList: React.FC<QuestionsListProps> = ({ questions, isLoading }) => {
  return (
    <div className="grid grid-cols-1 gap-4 pb-6 justify-center sm:justify-start">
      <Suspense fallback={<HorizontalCardSkeleton />}>
        {isLoading
          ? Array.from({ length: 5 }).map((_, idx) => (
              <HorizontalCardSkeleton key={`skeleton_${idx}`} />
            ))
          : questions.map((question) => (
              <Link href={`/questions/${question.id}`} key={`question_${question.id}`} className="flex justify-center md:block">
                <HorizontalCard question={question} className="hidden md:flex" />
                <VerticalCard question={question} className="md:hidden" />
              </Link>
            ))}
      </Suspense>
    </div>
  );
};

export default QuestionsList;

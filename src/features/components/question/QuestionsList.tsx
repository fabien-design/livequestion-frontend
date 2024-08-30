// QuestionsList.tsx (Client Component)
"use client";

import React, { Suspense } from "react";
import Link from "next/link";
import HorizontalCard from "@/features/components/HorizontalCard";
import HorizontalCardSkeleton from "@/features/components/skeletons/HorizontalCardSkeleton";
import { QuestionHome } from "@/features/query/question.query";

type QuestionsListProps = {
  questions: QuestionHome[];
  isLoading: boolean;
};

const QuestionsList: React.FC<QuestionsListProps> = ({ questions, isLoading }) => {
  return (
    <div className="grid grid-cols-1 gap-4 pb-6">
      <Suspense fallback={<HorizontalCardSkeleton />}>
        {isLoading
          ? Array.from({ length: 5 }).map((_, idx) => (
              <HorizontalCardSkeleton key={`skeleton_${idx}`} />
            ))
          : questions.map((question) => (
              <Link href={`/questions/${question.id}`} key={`question_${question.id}`}>
                <HorizontalCard question={question} />
              </Link>
            ))}
      </Suspense>
    </div>
  );
};

export default QuestionsList;

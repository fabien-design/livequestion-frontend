// QuestionsPage.tsx
import MaxWidthWrapper from "@/features/components/MaxWidthWrapper";
import { getQuestions } from "@/features/query/question.query";
import { getCategories } from "@/features/query/category.query";
import { getAuthors } from "@/features/query/user.query";
import QuestionsList from "@/features/components/question/QuestionsList"; // Import the new client component
import { PaginationComponent } from "@/features/components/PaginationComponent";
import { QuestionFilter } from "@/features/components/question/QuestionFilter";

export default async function QuestionsPage({
  searchParams,
}: {
  searchParams: { page?: string; title?: string; category?: string; author?: string };
}) {
  const page = parseInt(searchParams.page ?? "1");
  const title = searchParams.title ?? "";
  const category = searchParams.category ?? "";
  const author = searchParams.author ?? "";

  const [categories, authors] = await Promise.all([getCategories(), getAuthors(null)]);
  const questionsData = await getQuestions(page, title, category, author);

  const questions = questionsData.items;
  const paginationData = questionsData.pagination;

  return (
    <MaxWidthWrapper className="pt-20">
      <h2 className="text-3xl font-bold pb-12">Les questions</h2>

      <h3 className="text-xl">Filtrer les résultats</h3>
      <div className="py-10">
        {categories && authors && (
          <QuestionFilter categories={categories} authors={authors} />
        )}
      </div>
        {questions && (
          <QuestionsList questions={questions} isLoading={questions.length === 0} />
        )}

      {paginationData && (
        <PaginationComponent
          pagesNumber={paginationData.totalPages}
          currentPageNumber={paginationData.currentPage}
          className="py-12"
        />
      )}
    </MaxWidthWrapper>
  );
}

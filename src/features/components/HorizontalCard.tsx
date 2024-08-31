
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";
import { QuestionHome } from "../query/question.query";
import { CardButton } from "./CardButton";

type QuestionProps = {
  question: QuestionHome;
  isBig?: boolean;
  className?: string;
};

const HorizontalCard = ({ question, isBig = false, className }: QuestionProps) => {
  const [timeAgo, setTimeAgo] = useState("");

  useEffect(() => {
    const currentDate = new Date();
    const creationDate = new Date(question.createdAt);
    const timeDiff = Math.abs(currentDate.getTime() - creationDate.getTime());
    const daysDiff = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));
    const hoursDiff = Math.ceil(timeDiff / (1000 * 60 * 60));
    const minutesDiff = Math.ceil(timeDiff / (1000 * 60));
    const secondsDiff = Math.ceil(timeDiff / 1000);

    if (secondsDiff < 60) {
      setTimeAgo(`il y a ${secondsDiff} secondes`);
    } else if (minutesDiff < 60) {
      setTimeAgo(`il y a ${minutesDiff} minutes`);
    } else if (hoursDiff < 24) {
      setTimeAgo(`il y a ${hoursDiff} heures`);
    } else {
      setTimeAgo(`il y a ${daysDiff} jours`);
    }
  }, [question.createdAt]);

  return (
    <div className={cn("flex flex-col md:flex-row mb-4 flex-[1,1,auto]", { "md:flex-row": isBig }, className)}>
      <img
        src={
          question.images?.name
            ? `${process.env.NEXT_PUBLIC_BACKEND_HOST}${process.env.NEXT_PUBLIC_IMAGES_PATH}${question.images?.name}`
            : "/images/question-placeholder.jpg"
        }
        alt="image of the question"
        className={cn("object-cover w-full rounded-[30px] aspect-[1.6/1]", {
          "max-w-[200px] sm:max-w-[300px]": !isBig,
          "max-w-[250px] sm:max-w-[300px] md:max-w-[400px] lg:max-w-[600px]": isBig,
        })}
      />
      <div className="pl-12 py-4 flex-grow content-center">
        <div className={cn("flex items-center text-black mb-2", { "text-xl": isBig, "text-sm": !isBig })}>
          <CardButton
            className="font-bold ease-in duration-200 z-10 pointer-events-auto"
            href={`/questions/?category=${question.category.id.toString()}`}
          >
            {question.category.name}
          </CardButton>
          <span className="mx-4 font-bold">&#903;</span>
          <p>{timeAgo}</p>
        </div>
        <h3 className={cn("font-semibold mb-2", { "text-3xl": isBig, "text-lg": !isBig })}>{question.title}</h3>
        <div className="flex items-center text-primary">
          <p>
            <span className={cn("font-semibold", { "text-base": isBig, "text-sm": !isBig })}>
              {question.answersCount}
            </span>{" "}
            réponses - Par{" "}
            <CardButton href={`/users/${question.author.username}`}>{question.author.username}</CardButton>
          </p>
        </div>
      </div>
    </div>
  );
};

export default HorizontalCard;

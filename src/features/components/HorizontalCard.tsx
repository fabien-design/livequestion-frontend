import { cn } from "@/lib/utils";
import { HTMLAttributes } from "react";
import { QuestionHome } from "../query/question.query";
import Link from "next/link";
import { useRouter } from "next/navigation";

type QuestionProps = {
    question: QuestionHome;
    isBig?: boolean;
};

const HorizontalCard = ({ question, isBig = false }: QuestionProps) => {
    const currentDate = new Date();
    const creationDate = new Date(question.createdAt);
    const router = useRouter();
    const timeDiff = Math.abs(currentDate.getTime() - creationDate.getTime());
    const daysDiff = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));
    const hoursDiff = Math.ceil(timeDiff / (1000 * 60 * 60));
    const minutesDiff = Math.ceil(timeDiff / (1000 * 60));
    const secondsDiff = Math.ceil(timeDiff / 1000);

    let timeAgo = "";
    if (secondsDiff < 60) {
        timeAgo = `il y a ${secondsDiff} secondes`;
    } else if (minutesDiff < 60) {
        timeAgo = `il y a ${minutesDiff} minutes`;
    } else if (hoursDiff < 24) {
        timeAgo = `il y a ${hoursDiff} heures`;
    } else {
        timeAgo = `il y a ${daysDiff} jours`;
    }

    return (
        <div
            className={cn("flex flex-col md:flex-row mb-4 flex-[1,1,auto]", {
                "md:flex-row": isBig,
            })}
        >
            <img
                src={
                    question.images?.name != null
                        ? `${process.env.NEXT_PUBLIC_BACKEND_HOST}${process.env.NEXT_PUBLIC_IMAGES_PATH}${question.images?.name}`
                        : ""
                }
                alt="image of the question"
                className={cn(
                    "object-cover w-full rounded-[30px] aspect-[1.6/1]",
                    {
                        "max-w-[200px] sm:max-w-[300px]": !isBig, // 300px max width
                        "max-w-[250px] sm:max-w-[300px] md:max-w-[400px] lg:max-w-[600px]":
                            isBig, // 600px max width
                    }
                )}
            />
            <div className="pl-12 py-4 flex-grow content-center">
                <div
                    className={cn("flex items-center text-black mb-2", {
                        "text-xl": isBig,
                        "text-sm": !isBig,
                    })}
                >
                    <Link
                        className="font-bold hover:underline hover:underline-offset-2 cursor-pointer
                        ease-in duration-200 z-10 pointer-events-auto"
                        href={`/questions/?category=${question.category.name}`}
                    >
                        {question.category.name}
                    </Link>
                    <span className="mx-4 font-bold">&#903;</span>
                    <p>{timeAgo}</p>
                </div>
                <h3
                    className={cn("font-semibold mb-2", {
                        "text-3xl": isBig,
                        "text-lg": !isBig,
                    })}
                >
                    {question.title}
                </h3>
                <div className="flex items-center text-primary">
                    <p>
                        <span
                            className={cn("font-semibold", {
                                "text-base": isBig,
                                "text-sm": !isBig,
                            })}
                        >
                            {question.answersCount}
                        </span>{" "}
                        réponses - Par{" "}
                        <Link
                            href={`/questions?author=${question.author.username}`}
                            className="hover:underline hover:underline-offset-2"
                        >
                            {question.author.username}
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default HorizontalCard;

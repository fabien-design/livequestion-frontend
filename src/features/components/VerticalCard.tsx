import { cn } from "@/lib/utils";
import { HTMLAttributes } from "react";
import { QuestionHome } from "../query/question.query";
import { isBigInt64Array } from "util/types";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

type QuestionProps = {
    question: QuestionHome;
    isBig?: boolean;
    className?: string;
};

const VerticalCard = ({ question, isBig = false, className }: QuestionProps) => {
    const currentDate = new Date();
    const creationDate = new Date(question.createdAt);
    const timeDiff = Math.abs(currentDate.getTime() - creationDate.getTime());
    const daysDiff = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));
    const hoursDiff = Math.ceil(timeDiff / (1000 * 60 * 60));
    const minutesDiff = Math.ceil(timeDiff / (1000 * 60));
    const secondsDiff = Math.ceil(timeDiff / 1000);
    const router = useRouter();

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
            className={cn("flex flex-col", {
                "w-full max-w-[300px] sm:max-w-[300px] md:max-w-[400px] lg:max-w-[500px]":
                    !isBig, // 300px max width
                "w-full max-w-[350px] sm:max-w-[450px] md:max-w-[500px] lg:max-w-[600px]":
                    isBig, // 600px max width
            }, className)}
        >
            <div className="relative">
                <button
                    onClick={(e) => {
                        e.preventDefault();
                        router.push(
                            `/questions?category=${question.category.name}`
                        );
                    }}
                    className="py-2 px-4 md:px-6 text-white text-center text-sm 
                    bg-[#AD0569]/80 hover:bg-[#AD0569] ease-in duration-300 rounded-full absolute top-2 right-2"
                >
                    {question.category.name}
                </button>
                <img
                    src={
                        question.images?.name != null
                            ? `${process.env.NEXT_PUBLIC_BACKEND_HOST}${process.env.NEXT_PUBLIC_IMAGES_PATH}${question.images?.name}`
                            : "/images/question-placeholder.jpg"
                    }
                    alt="image of the question"
                    className={cn(
                        "object-cover w-full rounded-[30px] aspect-[1.6/1]",
                        {}
                    )}
                />
            </div>
            <div className="p-4">
                <h3
                    className={cn("font-semibold mb-2", {
                        "text-3xl": isBig,
                        "text-lg": !isBig,
                    })}
                >
                    {question.title}
                </h3>
                <div className="flex items-center text-primary">
                    <p
                        className={cn("", {
                            "text-sm": isBig,
                            "text-[12px]": !isBig,
                        })}
                    >
                        <span className={cn("font-semibold")}>
                            {question.answersCount}
                        </span>{" "}
                        réponses - Par{" "}
                        <button
                            onClick={(e) => {
                                e.preventDefault();
                                router.push(
                                    `/users/${question.author.username}`
                                );
                            }}
                            className="hover:underline hover:underline-offset-2"
                        >
                            {question.author.username}
                        </button>{" "}
                        - {timeAgo}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default VerticalCard;

import { cn } from "@/lib/utils";
import { HTMLAttributes } from "react";

interface CardProps extends HTMLAttributes<HTMLDivElement> {
    imgSrc?: string;
    question: string;
    answers: number;
    category: string;
    date: string;
    user: string;
    isBig?: boolean;
}

const HorizontalCard = ({
    imgSrc,
    question,
    answers,
    category,
    date,
    user,
    isBig = false,
    ...props
}: CardProps) => {
    const currentDate = new Date();
    const creationDate = new Date(date);
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
            {...props}
        >
            <img
                src={imgSrc}
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
            <div className="pl-12 py-4 flex-grow">
                <div
                    className={cn("flex items-center text-black mb-2", {
                        "text-xl": isBig,
                        "text-sm": !isBig,
                    })}
                >
                    <p className="font-bold">{category}</p>
                    <span className="mx-4 font-bold">&#903;</span>
                    <p>{timeAgo}</p>
                </div>
                <h3
                    className={cn("font-semibold mb-2", {
                        "text-3xl": isBig,
                        "text-lg": !isBig,
                    })}
                >
                    {question}
                </h3>
                <div className="flex items-center text-primary">
                    <p>
                        <span
                            className={cn("font-semibold", {
                                "text-base": isBig,
                                "text-sm": !isBig,
                            })}
                        >
                            {answers}
                        </span>{" "}
                        réponses - Par {user}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default HorizontalCard;

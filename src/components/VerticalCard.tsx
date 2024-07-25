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

const VerticalCard = ({
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
            className={cn("flex flex-col mb-4", {
                "max-w-[200px] sm:max-w-[300px] md:max-w-[400px] lg:max-w-[500px]": !isBig, // 300px max width
                "max-w-[250px] sm:max-w-[350px] md:max-w-[500px] lg:max-w-[600px]":
                    isBig, // 600px max width
            })}
            {...props}
        >
            <div className="relative"> 
                <span className="py-2 px-4 md:px-6 text-white text-center text-sm bg-[#AD0569]/90 rounded-full absolute top-2 right-2">{category}</span>
                <img
                    src={imgSrc}
                    alt="image of the question"
                    className={cn(
                        "object-cover w-full rounded-[30px] aspect-[1.6/1]",{}
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
                    {question}
                </h3>
                <div className="flex items-center text-primary">
                    <p className={cn("",  {
                                "text-sm": isBig,
                                "text-[12px]": !isBig,
                            })}>
                        <span
                            className={cn("font-semibold",)}
                        >
                            {answers}
                        </span>{" "}
                        réponses - Par {user} -{" "}
                        {timeAgo}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default VerticalCard;

import React, { PropsWithChildren } from "react";
import { QuestionHome } from "../query/question.query";
import { Avatar } from "@radix-ui/react-avatar";
import { AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import clsx from "clsx";
import VerticalCard from "../components/VerticalCard";
import Link from "next/link";
import { HeartFilledIcon } from "@radix-ui/react-icons";

type QuestionLayoutProps = PropsWithChildren<{
    user: QuestionHome["author"];
    createdAt?: QuestionHome["createdAt"];
    className?: string;
    questionId: number;
}>;


export const QuestionLayout = ({
    className,
    user,
    createdAt,
    questionId,
}: QuestionLayoutProps) => {

    return (
            {/* <Avatar>
                {user.avatar ? <AvatarImage src={user.avatar} alt="avatar" className="rounded-full "/> : null}
                <AvatarFallback>
                    {user.username.slice(0, 2).toUpperCase()}
                </AvatarFallback>
            </Avatar> */}
    );
};

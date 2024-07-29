import React from "react";
import { AuthorDetail, AuthorUndetailed } from "../query/author.query";
import Link from "next/link";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { AvatarFallback } from "@radix-ui/react-avatar";
import { formatDate } from "@/lib/date";

type PostHeaderProps = {
    propId?: string|number;
    user: AuthorDetail | AuthorUndetailed;
    createdAt: Date;
};

export const PostHeader = ({propId, user, createdAt}: PostHeaderProps) => {
    return (
        <Link
            href={`/users/${user.id}`}
            className="flex w-full gap-4 items-center group"
        >
            <Avatar>
                {user.avatar ? (
                    <AvatarImage
                        src={user.avatar}
                        alt="avatar"
                        className="h-12 w-12 rounded-full"
                    />
                ) : null}
                <AvatarFallback>
                    {user.username.slice(0, 2).toUpperCase()}
                </AvatarFallback>
            </Avatar>
            <div className="flex justify-between w-full">
                <p className="items-start flex group-hover:underline group-hover:underline-offset-2 font-bold">
                    <span>{user.username}</span>
                </p>
                {createdAt ? (
                    <p className="text-zinc-500 font-bold">
                        {formatDate(createdAt)}
                    </p>
                ) : null}
            </div>
        </Link>
    );
};

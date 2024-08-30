import React from "react";
import { UserDetail, UserDetailed } from "../query/user.query";
import Link from "next/link";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { AvatarFallback } from "@radix-ui/react-avatar";
import { formatDate } from "@/lib/date";

type PostHeaderProps = {
    propId?: string|number;
    user: UserDetail | UserDetailed;
    createdAt: Date;
};

export const PostHeader = ({propId, user, createdAt}: PostHeaderProps) => {
    return (
        <Link
            href={`/users/${user.id}`}
            className="flex w-full gap-4 items-center group"
        >
            <Avatar>
                {user.avatar.name ? (
                    <AvatarImage
                        src={`${process.env.NEXT_PUBLIC_BACKEND_HOST}${process.env.NEXT_PUBLIC_IMAGES_PATH}${user.avatar.name}`}
                        alt="avatar"
                        className="h-12 w-12 rounded-full"
                    />
                ) : null}
                <AvatarFallback>
                    <div className="w-10 h-10 flex items-center justify-center rounded-full bg-blue-700 text-white">
                        {user.username[0].toUpperCase()}
                    </div>  
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

"use client";

import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import React from "react";

type CardButtonProps = {
    href: string;
    children: React.ReactNode;
    className?: string;
};

export const CardButton = ({ href, children, className }: CardButtonProps) => {
    const router = useRouter();
    return (
        <button
            onClick={(e) => {
                e.preventDefault();
                router.push(href);
            }}
            className={cn(
                "hover:underline hover:underline-offset-2 cursor-pointer",
                className
            )}
        >
            {children}
        </button>
    );
};

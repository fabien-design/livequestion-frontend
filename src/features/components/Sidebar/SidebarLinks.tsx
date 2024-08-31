"use client";

import { cn } from "@/lib/utils";
import MaxWidthWrapper from "@/features/components/MaxWidthWrapper";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { House, MessageCircleQuestion, BookA, FilePlus } from 'lucide-react';

const LINKS = [
    { icon: <House className="h-6 w-6"/>, title: "Accueil", href: "/" },
    { icon: <MessageCircleQuestion className="h-6 w-6" />, title: "Les questions", href: "/questions" },
    { icon: <BookA className="h-6 w-6" />, title: "Les auteurs", href: "/users" },
    { icon: <FilePlus className="h-6 w-6" />, title: "Nouvelle question", href: "/questions/new" },
]

const SidebarLinks = () => {
    const pathname = usePathname();

    return (
        <>
            {LINKS.map(({ icon, title, href }) => (
                    <Link
                        key={title}
                        href={href}
                        className={cn("flex gap-4 items-center", {
                            "underline underline-offset-4":
                                pathname.endsWith(href),
                        })}
                    >
                        {icon}
                        {title}
                    </Link>
                ))
            }
        </>
    );
};

export default SidebarLinks;

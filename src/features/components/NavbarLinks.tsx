"use client";

import { cn } from "@/lib/utils";
import MaxWidthWrapper from "./MaxWidthWrapper";
import Link from "next/link";
import { usePathname } from "next/navigation";

const LINKS = [
    { title: "Accueil", href: "/" },
    { title: "Les questions", href: "/question" },
    { title: "Nouvelle question", href: "/question/new" },
]

const NavBarLinks = () => {
    const pathname = usePathname();

    return (
        <>
            {LINKS.map(({ title, href }) => (
                    <Link
                        key={title}
                        href={href}
                        className={cn("", {
                            "underline underline-offset-4":
                                pathname.endsWith(href),
                        })}
                    >
                        {title}
                    </Link>
                ))
            }
        </>
    );
};

export default NavBarLinks;
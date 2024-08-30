"use client";

import { cn } from "@/lib/utils";
import MaxWidthWrapper from "@/features/components/MaxWidthWrapper";
import Link from "next/link";
import { usePathname } from "next/navigation";

const LINKS = [
    { title: "Accueil", href: "/" },
    { title: "Les questions", href: "/questions" },
    { title: "Les auteurs", href: "/users" },
    { title: "Nouvelle question", href: "/questions/new" },
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

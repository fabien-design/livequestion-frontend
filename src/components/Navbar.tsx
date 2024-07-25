"use client";

import { cn } from "@/lib/utils";
import MaxWidthWrapper from "./MaxWidthWrapper";
import Link from 'next/link';
import { usePathname } from "next/navigation";


const NavBar = () => {
    const pathname  = usePathname();
    return (
        <nav className="bg-primary text-white">
            <MaxWidthWrapper className="flex items-center justify-between py-4">
                <div className="flex items-center space-x-4">
                    <h1 className="font-bold text-2xl font-Playfair_Display">Livequestion</h1>
                    <span className="text-white">|</span>
                    <Link href="/" className={cn("", {
                        "underline underline-offset-4": pathname.endsWith("/")
                    })}>Accueil</Link>
                    <Link href="/question" className={cn("", {
                        "underline underline-offset-4": pathname.endsWith("/question")
                    })}>Les questions</Link>
                    <Link href="/question/new" className={cn("", {
                        "underline underline-offset-4": pathname.endsWith("/question/new")
                    })}>Nouvelle question</Link>
                </div>
                <div>
                    <Link href="/login" className={cn("bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded",{
                        "underline underline-offset-4": pathname.endsWith("/login")
                    })}>Login</Link>
                </div>
            </MaxWidthWrapper>
        </nav>
    )
}

export default NavBar;

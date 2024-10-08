"use client"

import Link from "next/link";
import MaxWidthWrapper from "./MaxWidthWrapper";
import { useEffect, useState } from "react";
import { Category, getCategories } from "../query/category.query";

const Footer = () => {

    const [categories, setCategories] = useState<Category[]|null>(null);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const categories = await getCategories();
                setCategories(categories);
            } catch (error) {
                console.error("Error fetching categories with API:", error);
            }
        };

        fetchCategories();
    }, []);

    return (
        <footer className="bg-white text-black grid">
            <MaxWidthWrapper className="py-12">
                <div className="flex flex-col text-center font-Playfair_Display">
                    <h2 className="text-[clamp(20px,15vw,40px)] sm:text-5xl font-semibold text-primary">Livequestion</h2>
                    <p className="font-bold text-lg sm:text-2xl">Echangez autour de vos thématiques préférées</p>
                </div>
                <div className="border-b-2 bg-zinc-500 w-full my-10"></div>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:flex justify-between font-semibold text-lg md:text-xl">
                    {categories && (
                        categories.map((category) => (
                            <Link href={`/questions?category=${category.name}`} key={`category_${category.id}`}
                            className="text-center md:text-start">
                                {category.name}
                            </Link>
                        ))
                    )} 
                </div>
                <p className="pt-16 font-semibold text-sm sm:text-lg md:text-xl">@{new Date().getFullYear()}  - Projet étudiant BTS  / Licence - <Link href="mailto:contact@lyceestvincent.fr">Contactez-nous</Link></p>
            </MaxWidthWrapper>
            
        </footer>
    )
}

export default Footer; 

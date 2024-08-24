"use client"

import MaxWidthWrapper from "@/features/components/MaxWidthWrapper";
import React from "react";
import PostForm from "./PostForm";
import { useState } from "react";
import { useEffect } from "react";
import { Category, getCategories } from "@/features/query/category.query";
import Loading from "@/app/(home)/loading";

const Page = () => {
    const [categories, setCategories] = useState<Category[] | null>(null);
    const [isLoading, setIsLoaded] = useState(true);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const categories = await getCategories();
                setCategories(categories);
                
                setIsLoaded(false);
            } catch (error) {
                console.error("Error fetching questions with api:", error);
            }

        };
        
        fetchCategories();
    }, []);


    return (
        <MaxWidthWrapper>
            {categories ? (<PostForm categories={categories!} />): <Loading />}
        </MaxWidthWrapper>
    );
};

export default Page;

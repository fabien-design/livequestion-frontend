"use client"

import MaxWidthWrapper from '@/features/components/MaxWidthWrapper';
import { getLatestQuestions, QuestionHome } from '@/features/query/question.query';
import React, { useEffect, useState } from 'react'

const page = () => {

    const [questions, setQuestions] = useState<QuestionHome[]>([]);
    const [isLoaded, setIsLoaded] = useState<boolean>(false);


    useEffect(() => {
        setIsLoaded(true);
        const fetchQuestions = async () => {
            try {
                const latestQuestions = await getLatestQuestions();
                setQuestions(latestQuestions);
                setIsLoaded(false);
            } catch (error) {
                console.error("Error fetching questions with api:", error);
            }
        };
        
        fetchQuestions();
    }, []);


    return (
        <>
            <MaxWidthWrapper className='pt-20'>
                <h2 className='text-3xl font-bold pb-12'>Les questions</h2>

                <h3 className='text-xl'>Filtrer les résultats</h3>
                <div className='py-12'>

                </div>


            </MaxWidthWrapper>
        </>
    )
}

export default page;

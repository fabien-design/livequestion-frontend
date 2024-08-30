import { Answer } from '@/features/answer/Answer';
import MaxWidthWrapper from '@/features/components/MaxWidthWrapper';
import { findQuestionById, QuestionDetails } from '@/features/query/question.query';
import { QuestionDetailsLayout } from '@/features/components/question/QuestionDetailsLayout';
import { notFound } from 'next/navigation';

import React from 'react'

const Page = async ({ params }: {params: {id: string|number}}) => {

    // make db call
    const { id } = params;
    
    if(!id && id !== 'string'){
        return notFound();
    }

    const question: QuestionDetails = await findQuestionById(id);

    if (!question){
        return notFound();
    }



    return (
        <>
            <MaxWidthWrapper className='pb-8'>
                <QuestionDetailsLayout question={question}/>
              
            </MaxWidthWrapper>
        </>
    )

}

export default Page;

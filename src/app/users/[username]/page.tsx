import React from 'react'
import { UserInfos } from './UserInfos'
import MaxWidthWrapper from '@/features/components/MaxWidthWrapper'
import QuestionsList from '@/features/components/question/QuestionsList';
import { UserQuestionsList } from './UserQuestionsList';

const page = async ({ params }: { params: { username: string } }) => {
    console.log(params);
    const { username } = params;

    if (!username || typeof username !== 'string') {
        throw new Error('Invalid username');
    }
    return (
        <>
            <MaxWidthWrapper className='pt-[88px] bg-gray-100'>
                <UserInfos username={username} />
            </MaxWidthWrapper>
            <MaxWidthWrapper className='py-12'>
                <UserQuestionsList username={username} />
            </MaxWidthWrapper>
        </>
    );
};

export default page;
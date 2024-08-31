"use client";

import { UserInfos } from '@/app/users/[username]/UserInfos';
import { UserQuestionsList } from '@/app/users/[username]/UserQuestionsList';
import { AlertDialog } from '@/components/ui/alert-dialog';
import { Dialog } from '@/components/ui/dialog';
import MaxWidthWrapper from '@/features/components/MaxWidthWrapper';
import { AlertDialogContent, AlertDialogTitle } from '@radix-ui/react-alert-dialog';
import { DialogContent, DialogTitle } from '@radix-ui/react-dialog';
import React from 'react'

const page = async ({ params }: { params: { username: string } }) => {
    const { username } = params;

    if (!username || typeof username !== 'string') {
        throw new Error('Invalid username');
    }
    return (
        <AlertDialog open={true}>
            <AlertDialogContent>
                <AlertDialogTitle>Profil d'utilisateur</AlertDialogTitle>
                <MaxWidthWrapper className='pt-[88px] bg-gray-100'>
                    <UserInfos username={username} />
                </MaxWidthWrapper>
                <MaxWidthWrapper className='py-12'>
                    <UserQuestionsList username={username} />
                </MaxWidthWrapper>
            </AlertDialogContent>
        </AlertDialog>
    );
}
export default page;

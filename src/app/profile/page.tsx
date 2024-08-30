import { useUser } from "@/context/UserContext";import MaxWidthWrapper from "@/features/components/MaxWidthWrapper";
import UserInfos from "@/features/components/profile/UserInfos";
import UserInfosSkeleton from "@/features/components/profile/UserInfosSkeleton";
import UserUpdateForm from "@/features/components/profile/UserUpdateForm";
import React, { Suspense } from "react";

export default async function page() {

    return (<>
    <MaxWidthWrapper className="pt-12">
        <h2 className="text-3xl font-bold pb-12">Mes informations</h2>
        
        <UserInfos />
        <div className="my-6 h-1 w-full border-dashed border-b-4 border-gray-200"></div>
        <h2 className="text-2xl font-semibold pb-8">Modifier mes informations</h2>
        <UserUpdateForm />

    </MaxWidthWrapper>
    </>);
}

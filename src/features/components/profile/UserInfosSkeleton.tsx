import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

export default function UserInfosSkeleton({ noEmail }: { noEmail?: boolean }) {
    return (
        <div>
            <div className="w-full flex justify-center pb-6">
                <Skeleton className="h-[6rem] w-[6rem] bg-gray-300 text-3xl sm:h-32 sm:w-32 sm:text-6xl rounded-full flex justify-center items-center"></Skeleton>
            </div>
            <div className="md:flex md:justify-evenly">
                <div className="flex gap-2 justify-center items-center">Pseudo: <Skeleton className="ml-2 w-[150px] h-[20px] bg-gray-300"></Skeleton></div>
                {!noEmail && (<div className="flex gap-2 justify-center items-center">Email: <Skeleton className="ml-2 w-[150px] h-[20px] bg-gray-300"></Skeleton></div>)}
                <div className="flex gap-2 justify-center items-center">
                    Date de création du compte:{" "}
                    <Skeleton className="ml-2 w-[85px] h-[20px] bg-gray-300"></Skeleton>
                </div>
            </div>
        </div>
    );
}

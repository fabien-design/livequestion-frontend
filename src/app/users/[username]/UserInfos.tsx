"use client";

import { UserInfosCardSkeleton } from "@/features/components/users/UserInfosCardSkeleton";
import { getUserDetail, UserDetail } from "@/features/query/user.query";
import { Avatar } from "@files-ui/react";
import React, { useEffect, useState } from "react";

export const UserInfos = ({ username }: { username: string }) => {
    const [userInfos, setUserInfos] = useState<UserDetail>();
    const [loading, setLoading] = useState<boolean>();
    const [error, setError] = useState<string>();
    useEffect(() => {
        setLoading(true);
        const fetchData = async () => {
            try {
                setUserInfos(await getUserDetail(username));
            } catch (error) {
                // Handle error here
                setError("impossible de récuperer les infos de l'utilisateur");
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    if (loading) {
        return <UserInfosCardSkeleton />;
    }

    return (
        <div>
            {userInfos && (
                <>
                    <div className="w-full flex justify-center pb-6">
                        {userInfos.avatar.name ? (
                            <Avatar
                                src={`${process.env.NEXT_PUBLIC_BACKEND_HOST}${process.env.NEXT_PUBLIC_IMAGES_PATH}${userInfos.avatar.name}`}
                                variant="circle"
                                smartImgFit={"center"}
                                style={{ height: "8rem", width: "8rem" }}
                                readOnly
                                alt="User avatar"
                            />
                        ) : (
                            <div className="h-[6rem] w-[6rem] text-3xl sm:h-32 sm:w-32 sm:text-6xl rounded-full bg-blue-500 text-white font-bold flex justify-center items-center">
                                {userInfos.username.slice(0, 1)}
                            </div>
                        )}
                    </div>
                    <div className="md:flex md:justify-evenly">
                        <p className="flex items-center gap-2">
                            Pseudo:{" "}
                            <span className="ml-2 text-ellipsis overflow-hidden">
                                {userInfos.username}
                            </span>
                        </p>
                        <div className="flex gap-2 items-center">
                            <p>A rejoint le : </p>

                            <span className="md:ml-2">
                                {userInfos.createdAt &&
                                    new Date(
                                        userInfos.createdAt
                                    ).toLocaleDateString("fr")}
                            </span>
                        </div>
                    </div>
                    <div>
                        <hr className="mt-6 border border-dashed border-gray-400" />
                        <div className="text-center w-full py-4">
                            <span className="text-md pr-2">
                                {userInfos.questionCount}
                            </span>{" "}
                            {userInfos.questionCount > 1
                                ? "Questions posées"
                                : "Question posée"}
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};

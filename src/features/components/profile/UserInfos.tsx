"use client";

import { useUser } from "@/context/UserContext";
import { useEffect, useState } from "react";
import { AuthorDetail, getAuthorDetail } from "../../query/author.query";
import { Avatar } from "@files-ui/react";
import { getSession } from "@/lib";
import UserInfosSkeleton from "./UserInfosSkeleton";

export default function UserInfos() {
    const { user } = useUser();
    const [token, setToken] = useState<string | undefined>(undefined);
    const [userDetails, setUserDetails] = useState<AuthorDetail | undefined>();
    const [loading, setLoading] = useState<boolean>();

    useEffect(() => {
        setLoading(true);
        const fetchData = async () => {
            try {
                if (user !== null) {
                    console.log(user);
                    setUserDetails(await getAuthorDetail(user.username));
                    setToken(await getSession());
                }
            } catch (error) {
                // Handle error here
                
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [user]);

    // Render skeleton while loading
    if (loading) {
        return <UserInfosSkeleton />;
    }

    return (
        <div>
            {userDetails && (
                <>
                    <div className="w-full flex justify-center pb-6">
                        {userDetails.avatar.name ? (
                            <Avatar
                                src={`${process.env.NEXT_PUBLIC_BACKEND_HOST}${process.env.NEXT_PUBLIC_IMAGES_PATH}${userDetails.avatar.name}`}
                                variant="circle"
                                smartImgFit={"center"}
                                style={{ height: "8rem", width: "8rem" }}
                                readOnly
                                alt="User avatar"
                            />
                        ) : (
                            <div className="h-[6rem] w-[6rem] text-3xl sm:h-32 sm:w-32 sm:text-6xl rounded-full bg-blue-500 text-white font-bold flex justify-center items-center">
                                {userDetails.username.slice(0, 1)}
                            </div>
                        )}
                    </div>
                    <div className="md:flex md:justify-evenly">
                        <p className="flex gap-2">
                            Pseudo:{" "}
                            <span className="ml-2">{userDetails.username}</span>
                        </p>
                        <p className="flex gap-2">
                            Email:{" "}
                            <span className="ml-2">{userDetails.email}</span>
                        </p>
                        <p className="flex gap-2">
                            Date de création du compte:{" "}
                            <span className="ml-2">
                                {userDetails.createdAt &&
                                    new Date(
                                        userDetails.createdAt
                                    ).toLocaleDateString("fr")}
                            </span>
                        </p>
                    </div>
                </>
            )}
        </div>
    );
}

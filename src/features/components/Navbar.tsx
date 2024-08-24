"use client";

import { cn } from "@/lib/utils";
import MaxWidthWrapper from "./MaxWidthWrapper";
import Link from "next/link";
import NavBarLinks from "./NavbarLinks";
import { JwtPayload } from '@/types/jwt';
import { getUserSession } from "@/app/(home)/action";
import { useEffect, useState, useMemo } from "react";
import { getAuthorDetail } from "../query/author.query";
import Loading from "@/app/(home)/loading";

const NavBar = () => {
    const [user, setUser] = useState<JwtPayload | null>(null);
    const [userDetails, setUserDetails] = useState<any>(null);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const userData = await getUserSession();
                setUser(userData);

                if (userData && userData.username) {
                    const userDetails = await getAuthorDetail(userData.username);
                    setUserDetails(userDetails);
                } else {
                    console.log("User is not logged in");
                }
            } catch (error) {
                console.error("Error fetching user data or details:", error);
            }
        };

        fetchUserData();
    }, []);

    const memoizedUserDetails = useMemo(() => userDetails, [userDetails]);
    const memoizedUser = useMemo(() => user, [user]);

    return (
        <nav className="bg-primary text-white">
            <MaxWidthWrapper className="flex items-center justify-between py-4">
                <div className="flex items-center space-x-4">
                    <h1 className="font-bold text-2xl font-Playfair_Display">
                        Livequestion
                    </h1>
                    <span className="text-white">|</span>
                    <NavBarLinks />
                </div>
                <div>
                    {memoizedUser ? (
                        <Link className="flex gap-2 items-center" href="/profile">
                            {memoizedUserDetails?.avatar ? (
                                <img
                                    src={memoizedUserDetails.avatar}
                                    alt="Avatar"
                                    className="w-10 h-10 rounded-full"
                                />
                            ) : memoizedUserDetails?.username ? (
                                <div className="w-10 h-10 flex items-center justify-center rounded-full bg-blue-700 text-white">
                                    {memoizedUserDetails.username[0]}
                                </div>
                            ) : (
                                <Loading />
                            )}
                            <span className="ml-2">{memoizedUser.username}</span>
                        </Link>
                    ) : (
                        <Link
                            href="/login"
                            className={cn(
                                "bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                            )}
                        >
                            Login
                        </Link>
                    )}
                </div>
            </MaxWidthWrapper>
        </nav>
    );
};

export default NavBar;

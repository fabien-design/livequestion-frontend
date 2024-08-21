"use client";

import { cn } from "@/lib/utils";
import MaxWidthWrapper from "./MaxWidthWrapper";
import Link from "next/link";
import NavBarLinks from "./NavbarLinks";
import { JwtPayload } from '@/types/jwt';
import { getUserSession } from "@/app/(home)/action";
import { useEffect, useState } from "react";
import { getAuthorDetail } from "../query/author.query";
import Loading from "@/app/(home)/loading";
import Router from "next/router";

const NavBar = () => {
    const [user, setUser] = useState<JwtPayload | null>(null); // Assurez-vous que JwtPayload est bien défini
    const [userDetails, setUserDetails] = useState<any>(null); // Remplacez any par le type correct si possible

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const userData = await getUserSession();
                setUser(userData);

                if (userData && userData.username) {
                    console.log("User is logged in", userData);
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
                    {user ? (
                        <Link className="flex gap-2 items-center" href="/profile">
                            {userDetails?.avatar ? (
                                <img
                                    src={userDetails.avatar}
                                    alt="Avatar"
                                    className="w-10 h-10 rounded-full"
                                />
                            ) : userDetails?.username ? (
                                <div className="w-10 h-10 flex items-center justify-center rounded-full bg-blue-700 text-white">
                                    {userDetails.username[0]}
                                </div>
                            ) : (
                                <Loading />
                            )}
                            <span className="ml-2">{user.username}</span>
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

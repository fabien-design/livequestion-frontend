"use client";

import Link from "next/link";
import MaxWidthWrapper from "../MaxWidthWrapper";
import NavBarLinks from "./NavbarLinks";
import { useUser } from "@/context/UserContext";
import { Suspense, useEffect, useState } from "react";
import { UserDetail, getUserDetail } from "../../query/user.query";
import { NavbarUserDropdown } from "./NavbarUserDropdown";
import { Skeleton } from "@/components/ui/skeleton";
import UserSkeleton from "./UserSkeleton";

const NavBar = () => {
    const { user } = useUser();
    const [userDetails, setUserDetails] = useState<
        UserDetail | null | undefined
    >(null);
    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        setLoading(true);
        const fetchUserDetails = async () => {
            if (user && user.username) {
                try {
                    const details = await getUserDetail(user.username);
                    setUserDetails(details);
                } catch (error) {
                    console.error("Error fetching user details:", error);
                }
            }
            setLoading(false);
        };

        fetchUserDetails();
    }, [user]);

    return (
        <nav className="bg-primary text-white h-[88px] z-40">
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
                        
                        userDetails && user.username === userDetails.username ? (
                            <NavbarUserDropdown
                                userDetails={userDetails!}
                                loading={loading}
                            />
                        ): (<UserSkeleton />)

                    ) : (
                        <Link
                            href="/login"
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
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

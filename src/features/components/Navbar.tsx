"use client";

import Link from "next/link";
import MaxWidthWrapper from "./MaxWidthWrapper";
import NavBarLinks from "./NavbarLinks";
import { useUser } from "@/context/UserContext";
import { useEffect, useState } from "react";
import { AuthorDetail, getAuthorDetail } from "../query/author.query";
import Loading from "@/app/(home)/loading";
import { NavbarUserDropdown } from "./NavbarUserDropdown";

const NavBar = () => {
    const { user } = useUser();
    const [userDetails, setUserDetails] = useState<AuthorDetail|null|undefined>(null);

    useEffect(() => {
        const fetchUserDetails = async () => {
            if (user && user.username) {
                try {
                    const details = await getAuthorDetail(user.username);
                    setUserDetails(details);
                } catch (error) {
                    console.error("Error fetching user details:", error);
                }
            }
        };

        fetchUserDetails();
    }, [user]);

    return (
        <nav className="bg-primary text-white">
            <MaxWidthWrapper className="flex items-center justify-between py-4">
                <div className="flex items-center space-x-4">
                    <h1 className="font-bold text-2xl font-Playfair_Display">Livequestion</h1>
                    <span className="text-white">|</span>
                    <NavBarLinks />
                </div>
                <div>
                    {user && userDetails ? (
                        // <Link className="flex gap-2 items-center" href="/profile">
                        //     {userDetails?.avatar.name ? (
                        //         <img
                        //             src={`${process.env.NEXT_PUBLIC_BACKEND_HOST}${process.env.NEXT_PUBLIC_IMAGES_PATH}${userDetails.avatar.name}`}
                        //             alt="Avatar"
                        //             className="w-10 h-10 rounded-full"
                        //         />
                        //     ) : (
                        //         <div className="w-10 h-10 flex items-center justify-center rounded-full bg-blue-700 text-white">
                        //             {userDetails?.username[0]}
                        //         </div>
                        //     )}
                        //     <span className="ml-2">{user.username}</span>
                        // </Link>
                        <NavbarUserDropdown userDetails={userDetails!} />
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

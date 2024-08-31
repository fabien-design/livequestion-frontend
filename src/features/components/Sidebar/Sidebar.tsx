"use client";

import React, { useEffect, useState } from 'react';
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetDescription,
    SheetFooter,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
  } from "@/components/ui/sheet"
import Link from 'next/link';
import SidebarLinks from './SidebarLinks';
import { cn } from '@/lib/utils';
import MaxWidthWrapper from "../MaxWidthWrapper";
import { useUser } from '@/context/UserContext';
import { UserDetail, getUserDetail } from '@/features/query/user.query';
import { NavbarUserDropdown } from '../Navbar/NavbarUserDropdown';
import UserSkeleton from '../Navbar/UserSkeleton';


const Sidebar = ({className}: {className?: string}) => {
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
        <div className={cn("bg-primary text-white h-[88px] z-40", className)}>
            <Sheet>
                <MaxWidthWrapper className="flex items-center justify-between py-4">
                <div className="flex items-center space-x-4">
                    <SheetTrigger asChild>
                        <h1 className="font-bold text-[clamp(1rem,_6vw,_2rem)] sm:text-2xl font-Playfair_Display after:absolute
                        after:h-[2px] after:w-0 after:left-0 after:bottom-1 relative after:bg-gray-200 hover:after:w-full
                        after:transition-all after:duration-300 cursor-pointer">
                            Livequestion
                        </h1>
                    </SheetTrigger>
                    <span className="text-white">|</span>
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
            <SheetContent side="left">
                <SheetTitle className="hidden">Menu</SheetTitle> {/* can't delete it to avoid error msg */}
                <nav className="grid gap-6 text-lg font-medium">
                    <SidebarLinks />
                </nav>
            </SheetContent>
            </Sheet>
        </div>
      )
}

export default Sidebar;

"use client";

import React from "react";
import { AuthorDetail } from "../query/author.query";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuPortal,
    DropdownMenuSeparator,
    DropdownMenuShortcut,
    DropdownMenuSub,
    DropdownMenuSubContent,
    DropdownMenuSubTrigger,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { LogOut, User } from "lucide-react";
import { useRouter } from "next/navigation";
import { logoutUser } from "@/app/(home)/action";
import { useUser } from "@/context/UserContext";

type NavbarUserDropdownProps = {
    userDetails: AuthorDetail;
};

export const NavbarUserDropdown = ({
    userDetails,
}: NavbarUserDropdownProps) => {
    const router = useRouter();
    const { setUser } = useUser(); // Get the setUser function from context


    // Make handleLogout async to await the server action
    const handleLogout = async () => {
        await logoutUser(); // Await the logoutUser action to ensure the session cookie is deleted
        setUser(null); // Clear the user state in the context
        router.refresh(); // Refresh the page to update the session state
    };

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <div className="flex gap-2 items-center cursor-pointer hover:shadow-[inset_4px_4px_12px_#AD0569,_inset_-4px_-4px_12px_#AD0569] hover:bg-[#AD487A] py-2 px-4 rounded-md">
                    {userDetails?.avatar.name ? (
                        <img
                            src={`${process.env.NEXT_PUBLIC_BACKEND_HOST}${process.env.NEXT_PUBLIC_IMAGES_PATH}${userDetails.avatar.name}`}
                            alt="Avatar"
                            className="w-10 h-10 rounded-full"
                        />
                    ) : (
                        <div className="w-10 h-10 flex items-center justify-center rounded-full bg-blue-700 text-white">
                            {userDetails?.username[0]}
                        </div>
                    )}
                    <span className="ml-2">{userDetails.username}</span>
                </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                    <User className="mr-2 h-4 w-4" />
                    <span>Profil</span>
                </DropdownMenuItem>

                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout}>
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Se déconnecter</span>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
};

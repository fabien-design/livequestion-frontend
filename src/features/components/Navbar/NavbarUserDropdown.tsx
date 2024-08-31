"use client";

import React, { useState } from "react";
import { UserDetail } from "../../query/user.query";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
    AlertDialog,
    AlertDialogTrigger,
    AlertDialogContent,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogCancel,
    AlertDialogAction,
} from "@/components/ui/alert-dialog"; // Ensure these components are correctly imported
import { LogOut, User } from "lucide-react";
import { useRouter } from "next/navigation";
import { logoutUser } from "@/app/(home)/action";
import { useUser } from "@/context/UserContext";

type NavbarUserDropdownProps = {
    userDetails: UserDetail;
    loading: boolean;
};

export const NavbarUserDropdown = ({
    userDetails,
    loading,
}: NavbarUserDropdownProps) => {
    const router = useRouter();
    const { setUser } = useUser();
    const [isAvatarLoading, setIsAvatarLoading] = useState(true);
    const [showLogoutDialog, setShowLogoutDialog] = useState(false);

    const handleLogout = async () => {
        await logoutUser();
        setUser(null);
        router.refresh();
    };

    // Function to handle image load completion
    const handleImageLoad = () => {
        setIsAvatarLoading(false);
    };

    return (
        <>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <div className="flex gap-2 items-center cursor-pointer hover:shadow-[inset_4px_4px_12px_#AD0569,_inset_-4px_-4px_12px_#AD0569] hover:bg-[#AD487A] py-2 px-4 rounded-md">
                        {userDetails?.avatar?.name ? (
                            <>
                                {isAvatarLoading && (
                                    <div className="w-10 h-10 rounded-full bg-gray-200 animate-pulse"></div>
                                )}
                                <img
                                    src={`${process.env.NEXT_PUBLIC_BACKEND_HOST}${process.env.NEXT_PUBLIC_IMAGES_PATH}${userDetails.avatar.name}`}
                                    alt="Avatar"
                                    className={`w-10 h-10 rounded-full transition-opacity duration-300 ${
                                        isAvatarLoading
                                            ? "opacity-0"
                                            : "opacity-100"
                                    }`}
                                    onLoad={handleImageLoad}
                                    style={{
                                        display: isAvatarLoading
                                            ? "none"
                                            : "block",
                                    }}
                                />
                            </>
                        ) : (
                            <div className="w-10 h-10 flex items-center justify-center rounded-full bg-blue-700 text-white">
                                {userDetails?.username[0]}
                            </div>
                        )}
                        <span className="ml-2 hidden sm:block">{userDetails.username}</span>
                    </div>
                </DropdownMenuTrigger>

                <DropdownMenuContent className="w-56">
                    <DropdownMenuLabel className="text-center sm:hidden">{userDetails.username}</DropdownMenuLabel>
                    <DropdownMenuLabel className="text-center hidden sm:block">Mon Compte</DropdownMenuLabel>
                    <DropdownMenuSeparator />

                    <DropdownMenuItem
                        className="cursor-pointer"
                        onClick={(e) => {
                            e.preventDefault();
                            router.push("/profile");
                        }}
                    >
                        <User className="mr-2 h-4 w-4" />
                        <span>Profil</span>
                    </DropdownMenuItem>

                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                        className="cursor-pointer"
                        onClick={() => setShowLogoutDialog(true)}
                    >
                        <LogOut className="mr-2 h-4 w-4" />
                        <span>Se déconnecter</span>
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
            <AlertDialog open={showLogoutDialog}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>
                            Êtes-vous sûr de vouloir vous déconnecter ?
                        </AlertDialogTitle>
                        <AlertDialogDescription>
                            Vous serez déconnecté de votre compte et vous devrez
                            vous reconnecter pour accéder aux questions.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel
                            onClick={() => setShowLogoutDialog(false)}
                        >
                            Non
                        </AlertDialogCancel>
                        <AlertDialogAction onClick={handleLogout}>
                            Oui
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </>
    );
};

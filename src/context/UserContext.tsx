"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { JwtPayload } from "@/types/jwt";
import { getUserSession } from "@/app/(home)/action";

interface UserContextType {
    user: JwtPayload | null;
    setUser: (user: JwtPayload | null) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<JwtPayload | null>(null);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const userData = await getUserSession();
                setUser(userData);
            } catch (error) {
                console.error("Failed to fetch user session:", error);
            }
        };

        fetchUser();
    }, []);

    return (
        <UserContext.Provider value={{ user, setUser }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUser = () => {
    const context = useContext(UserContext);
    if (!context) {
        throw new Error("useUser must be used within a UserProvider");
    }
    return context;
};

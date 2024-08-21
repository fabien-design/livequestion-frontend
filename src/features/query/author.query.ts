import { getSession } from "@/lib";

export type AuthorUndetailed = {
    id: number;
    username: string;
    avatar: string | null;
}

export type AuthorDetail = {
    id: number;
    username: string;
    email: string;  
    avatar: string | null;
}

export const getAuthorDetail = async (username: string): Promise<AuthorDetail|undefined> => {
    const token = await getSession(); 
    try {
        const response = await fetch(
            `${process.env.NEXT_PUBLIC_BACKEND_HOST}/api/users/${username}`, 
            {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`, // Assurez-vous que 'token' est une propriété de session
                },
            }
        );
        const data = await response.json();
        // Process the data or return it as needed
        return data;
    } catch (error) {
        // Handle any errors that occur during the request
        console.error("Error fetching user details:", error);
        throw error;
    }
}

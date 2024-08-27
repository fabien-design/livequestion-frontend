import { getSession } from "@/lib";

export type AuthorUndetailed = {
    id: number;
    username: string;
    avatar: string | null;
    questions_count: number;
}

export type AuthorDetail = {
    id: number;
    username: string;
    email: string;  
    avatar: string | null;
}

export async function getAuthors(): Promise<AuthorUndetailed[]> {
    const token = await getSession(); 
    // Verify if the user is authenticated before making the request
    if (!token) {
        throw new Error("User is not authenticated");
    }
    try {
        const response = await fetch(
            `${process.env.NEXT_PUBLIC_BACKEND_HOST}/api/users`,
            {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            }
        );
        const data = await response.json();
        return data;
    } catch (error) {
        // Handle any errors that occur during the request
        console.error("Error fetching authors:", error);
        throw error;
    }
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

export const getBestAuthors = async (): Promise<AuthorUndetailed[]> => {
    let url = `${process.env.NEXT_PUBLIC_BACKEND_HOST}/api/users/bests`;
    try {
        const response = await fetch(
            url
        );
        const data = await response.json();
        return data;
    } catch (error) {
        // Handle any errors that occur during the request
        console.error("Error fetching authors:", error);
        throw error;
    }
}

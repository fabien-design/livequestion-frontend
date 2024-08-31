import { getSession } from "@/lib";
import { AnswerDetail } from "./answer.query";
import { UserDetail, UserDetailed } from "./user.query";

export type QuestionHome = {
    id: number;
    images: {
        id: number|null;
        name: string|null;
    };
    title: string;
    author: UserDetailed;
    category: {
        id: number;
        name: string;
    };
    answersCount: number;
    createdAt: Date;
};

export type QuestionDetails = {
    id: number;
    images: {
        id: number|null;
        name: string|null;
        original_name: string|null;
        extension: string|null;
        size: number|null;
        updated_at: Date|null;
    };
    title: string;
    author: UserDetail;
    category: {
        id: number;
        name: string;
    };
    answers: [
        AnswerDetail
    ];
    createdAt: Date;
    updatedAt: Date;

};

export const getQuestions = async (page: number|null=1, title: string|null, category: string|null, author: string|null) => {
    let url = `${process.env.NEXT_PUBLIC_BACKEND_HOST}/api/questions?page=${page}&orderBy=desc&sortBy=date`;
    
    try {
        if (category){
            url += `&category=${category}`;
        }
        if (author){
            url += `&author=${author}`;
        }
        if (title){
            url += `&title=${title}`;
        }
        console.log(url);
        const response = await fetch(
            url,
        );
        const data = await response.json();
        // Process the data or return it as needed
        return data;
    } catch (error) {
        // Handle any errors that occur during the request
        console.error("Error fetching questions:", error);
        throw error;
    }
}

export const getLatestQuestions = async () => {
    try {
        const response = await fetch(
            `${process.env.NEXT_PUBLIC_BACKEND_HOST}/api/questions?limit=3&orderBy=desc&sortBy=date`,
        );
        const data = await response.json();
        // Process the data or return it as needed
        return data;
    } catch (error) {
        // Handle any errors that occur during the request
        console.error("Error fetching latest questions:", error);
        throw error;
    }
};

export const getLatestSportQuestions = async () => {
    try {
        const response = await fetch(
            `${process.env.NEXT_PUBLIC_BACKEND_HOST}/api/questions?limit=3&orderBy=desc&sortBy=date&category=Sport`,
        );
        const data = await response.json();
        // Process the data or return it as needed
        return data;
    } catch (error) {
        // Handle any errors that occur during the request
        console.error("Error fetching latest questions:", error);
        throw error;
    }
};

export const getRandomQuestions = async () => {
    try {
        const response = await fetch(
            `${process.env.NEXT_PUBLIC_BACKEND_HOST}/api/questions?limit=3&random=true`,
        );
        const data = await response.json();
        // Process the data or return it as needed
        return data;
    } catch (error) {
        // Handle any errors that occur during the request
        console.error("Error fetching latest questions:", error);
        throw error;
    }
};

export const getMostAnsweredQuestion = async () => {
    try {
        const response = await fetch(
            `${process.env.NEXT_PUBLIC_BACKEND_HOST}/api/questions/most-answers-last-three-days`,
        );
        const data = await response.json();
        // Process the data or return it as needed
        return data;
    } catch (error) {
        // Handle any errors that occur during the request
        console.error("Error fetching latest questions:", error);
        throw error;
    }
};

export const findQuestionById = async (id: string | number) => {
    try {
        const token = await getSession();
        if (!token || !token) {
            throw new Error("User is not authenticated");
        }

        const response = await fetch(
            `${process.env.NEXT_PUBLIC_BACKEND_HOST}/api/questions/${id}`, 
            {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`, // Assurez-vous que 'token' est une propriété de session
                },
            }
        );

        console.log(response);

        if (!response.ok) {
            return false;
            throw new Error(`Error fetching question with id ${id}: ${response.statusText}`);
        }
        
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error fetching question by ID:", error);
        throw error;
    }
};

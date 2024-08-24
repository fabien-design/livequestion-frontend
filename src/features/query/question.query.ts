import { getSession } from "@/lib";
import { AnswerDetail } from "./answer.query";
import { AuthorDetail, AuthorUndetailed } from "./author.query";

export const getQuestions = async () => {
    try {
        const response = await fetch(
            `${process.env.NEXT_PUBLIC_BACKEND_HOST}/api/questions?orderBy=desc&sortBy=date`,
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


export type QuestionHome = {
    id: number;
    images: {
        id: number|null;
        name: string|null;
    };
    title: string;
    author: AuthorUndetailed;
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
    author: AuthorDetail;
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

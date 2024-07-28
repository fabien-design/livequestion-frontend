export const getLatestQuestions = async () => {
    try {
        const response = await fetch(
            `${process.env.NEXT_PUBLIC_BACKEND_HOST}/api/questions?limit=3&orderBy=desc&sortBy=createdAt`,
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

export type QuestionHome = {
    id: number;
    images: {
        id: number|null;
        name: string|null;
    };
    title: string;
    author: {
        id: number;
        username: string;
        avatar: string|null;
    }
    category: {
        id: number;
        name: string;
    };
    answersCount: number;
    createdAt: Date;
};

export type Category = {
    id: number;
    name: string;
}

export async function getCategories(): Promise<Category[]> {
    try {
        const response = await fetch(
            `${process.env.NEXT_PUBLIC_BACKEND_HOST}/api/categories`,
        );
        const data = await response.json();
        return data;
    } catch (error) {
        // Handle any errors that occur during the request
        console.error("Error fetching categories:", error);
        throw error;
    }
}

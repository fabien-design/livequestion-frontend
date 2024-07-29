import { AuthorDetail } from "./author.query";

export type AnswerDetail = {
    id: number;
    content: string;
    createdAt: Date;
    updatedAt: Date;
    author: AuthorDetail;
}

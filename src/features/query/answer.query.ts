import { UserDetail } from "./user.query";

export type AnswerDetail = {
    id: number;
    content: string;
    createdAt: Date;
    updatedAt: Date;
    author: UserDetail;
}

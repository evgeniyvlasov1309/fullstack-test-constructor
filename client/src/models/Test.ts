import { QuestionModel } from "./Question";
import { User } from "./User";

export interface TestModel {
    id: string;
    title: string;
    creationDate: string;
    author: User;
    questions: QuestionModel[];
}
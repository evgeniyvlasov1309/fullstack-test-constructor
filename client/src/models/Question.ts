import { AnswerModel } from "./Answer";

export interface QuestionModel {
    id: string;
    type: string;
    description: string;
    answers: AnswerModel[];
    order: number;
}
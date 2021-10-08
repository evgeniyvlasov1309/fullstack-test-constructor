import { AxiosResponse } from "axios";
import $api from "../apiClient";
import { AnswerModel } from "../models/Answer";
import { QuestionModel } from "../models/Question";

export default class UserService {
    static createQuestion(testId: string, type: string, order: number, description: string, answers: AnswerModel[]): Promise<AxiosResponse<QuestionModel>> {
        return $api.post<QuestionModel>('/questions', { testId, type, order, description, answers });
    }

    static updateQuestion(id: string, type: string, order: number, description: string, answers: AnswerModel[]): Promise<AxiosResponse<QuestionModel>> {
        return $api.put<QuestionModel>(`/questions/${id}`, { type, order, description, answers });
    }

    static deleteQuestion(id: string): Promise<AxiosResponse<QuestionModel>> {
        return $api.delete<QuestionModel>(`/questions/${id}`);
    }
}
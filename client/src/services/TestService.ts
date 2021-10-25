import { AxiosResponse } from "axios";
import $api from "../apiClient";
import { CompletedTestModel } from "../models/CompletedTest";
import { TestModel } from "../models/Test";
import { UserAnswer } from "../models/UserAnswer";

export default class UserService {
    static fetchTests(): Promise<AxiosResponse<TestModel[]>> {
        return $api.get<TestModel[]>('/tests');
    }

    static createTest(title: string): Promise<AxiosResponse<TestModel>> {
        return $api.post<TestModel>('/tests', { title });
    }

    static fetchTest(id: string): Promise<AxiosResponse<TestModel>> {
        return $api.get<TestModel>(`/tests/${id}`);
    }

    static updateTest(id: string, title: string): Promise<AxiosResponse<TestModel>> {
        return $api.put<TestModel>(`/tests/${id}`, { title });
    }

    static deleteTest(id: string): Promise<AxiosResponse<TestModel>> {
        return $api.delete<TestModel>(`/tests/${id}`);
    }

    static completeTest(id: string, answers: UserAnswer[]): Promise<void> {
        return $api.post(`/tests/${id}`, { answers });
    }

    static fetchCompletedTests(): Promise<AxiosResponse<CompletedTestModel[]>> {
        return $api.get<CompletedTestModel[]>('/tests/completed');
    }

    static fetchCompletedTest(id: string): Promise<AxiosResponse<CompletedTestModel>> {
        return $api.get<CompletedTestModel>(`/tests/completed/${id}`);
    }
}
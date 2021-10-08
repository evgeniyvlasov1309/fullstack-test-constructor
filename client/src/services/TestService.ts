import { AxiosResponse } from "axios";
import $api from "../apiClient";
import { TestModel } from "../models/Test";

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
}
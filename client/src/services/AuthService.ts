import { AxiosResponse } from "axios";
import $api from "../apiClient";
import { AuthResponse } from "../models/response/AuthResponse";

export default class AuthService {
    static async login(email: string, password: string): Promise<AxiosResponse<AuthResponse>> {
        return $api.post('/users/login', {email, password});
    }

    static async registration(email: string, password: string): Promise<AxiosResponse<AuthResponse>> {
        return $api.post('/users/registration', {email, password});
    }

    static async logout(): Promise<void> {
        return $api.post('/users/logout');
    }

    static async resetPassword(email: string): Promise<void> {
        return $api.post('/users/reset-password', {email});
    }

    static async changePassword(password: string, id: string): Promise<void> {
        return $api.post(`/users/change-password`, {password, id});
    }
}
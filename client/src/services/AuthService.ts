import { AxiosResponse } from "axios";
import $api from "../apiClient";
import { AuthResponse } from "../models/response/AuthResponse";

export default class AuthService {
    static async login(email: string, password: string): Promise<AxiosResponse<AuthResponse>> {
        return $api.post('/login', {email, password});
    }

    static async registration(email: string, password: string): Promise<AxiosResponse<AuthResponse>> {
        return $api.post('/registration', {email, password});
    }

    static async logout(): Promise<void> {
        return $api.post('/logout');
    }

    static async refresh(): Promise<AxiosResponse<AuthResponse>> {
        return $api.get('/refresh');
    }

    static async resetPassword(email: string): Promise<void> {
        return $api.post('/reset-password', {email});
    }

    static async changePassword(password: string, id: string): Promise<void> {
        return $api.post(`/change-password`, {password, id});
    }
}
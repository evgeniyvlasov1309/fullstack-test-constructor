import axios, { AxiosRequestConfig } from "axios";
import AuthService from "../services/AuthService";

export const API_URL = 'http://localhost:5000/api';

const $api = axios.create({
    withCredentials: true,
    baseURL: API_URL
});

$api.interceptors.request.use((config: AxiosRequestConfig) => {
    config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`;
    return config;
});

$api.interceptors.response.use((config: AxiosRequestConfig) => {
    return config;
}, async error => {
    const originalRequest = error.config;
    if (error.response.status === 401 && error.config && !error.config._isRetry) {
        originalRequest._isRetry = true;
        try {
            const response = await AuthService.refresh();
            const {accessToken} = response.data;
            localStorage.setItem('token', accessToken);
            return $api.request(originalRequest);   
        } catch (e) {
            console.log('НЕ АВТОРИЗОВАН');
        }
    }
    throw error;
});

export default $api;
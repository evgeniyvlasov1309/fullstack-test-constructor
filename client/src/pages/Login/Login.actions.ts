import axios from "axios";
import { User } from "../../models/User";
import AuthService from "../../services/AuthService";
import {AuthResponse} from "../../models/response/AuthResponse";
import { API_URL } from "../../apiClient";


export const LOGIN_REQUEST_SUCCESS = '[Login] Login Request Success';
export const LOGIN_REQUEST_ERROR = '[Login] Login Request Error';
export const LOGOUT_REQUEST_SUCCESS = '[Login] Logout Request Success';
export const SET_LOADING = '[Login] Set Loading';

export function createLoginRequest(email: string, password: string) {
    return async (dispath: any, getState: any, history: any) => {
        try {
            dispath(setLoading(true));
            const response = await AuthService.login(email, password);
            const {accessToken, user} = response.data;
            localStorage.setItem('token', accessToken);
            dispath(createLoginRequestSuccess(user));
            history.push('/');
        } catch (e: any) {
            alert(e.response?.data?.message);
        }
    }
}

export function createRegistrationRequest(email: string, password: string) {
    return async (dispath: any, getState: any, history: any) => {
        try {
            dispath(setLoading(true));
            const response = await AuthService.registration(email, password);
            const {accessToken, user} = response.data;
            localStorage.setItem('token', accessToken);
            dispath(createLoginRequestSuccess(user));
            history.push('/');
        } catch (e: any) {
            alert(e.response?.data?.message);
        }
    }
}

export function createResetPassowrdRequest(email: string) {
    return async (dispath: any, getState: any, history: any) => {
        try {
            await AuthService.resetPassword(email);
            alert('Ссылка для восстановления пароля отправлена вам на почту')
        } catch (e: any) {
            alert(e.response?.data?.message);
        }
    }
}

export function createChangePassowrdRequest(password: string, id: string) {
    return async (dispath: any, getState: any) => {
        try {
            await AuthService.changePassword(password, id);
            alert('Пароль успешно сменен');
        } catch (e: any) {
            alert(e.response?.data?.message);
        }
    }
}

export function createLoginRequestSuccess(user: User) {
    return {
        type: LOGIN_REQUEST_SUCCESS,
        payload: {user}
    }
}

export function createLoginRequestError() {
    return {
        type: LOGIN_REQUEST_ERROR,
        payload: {}
    }
}

export function setLoading(loading: Boolean) {
    return {
        type: SET_LOADING,
        payload: {loading}
    }
}

export function createLogoutRequest() {
    return async (dispath: any, getState: any) => {
        try {
            await AuthService.logout();
            localStorage.removeItem('token');
            dispath(createLogoutRequestSuccess());
        } catch (e: any) {
            alert(e.response?.data?.message);
        }
    }
}

export function createLogoutRequestSuccess() {
    return {
        type: LOGOUT_REQUEST_SUCCESS,
        payload: {}
    }
}

export function checkAuth() {
    return async (dispath: any, getState: any) => {
        try {
            dispath(setLoading(true));
            const response = await axios.get<AuthResponse>(`${API_URL}/users/refresh`, {withCredentials: true});
            const {accessToken, user} = response.data;
            localStorage.setItem('token', accessToken);
            dispath(createLoginRequestSuccess(user));
        } catch (e: any) {
            dispath(createLoginRequestError());
            alert(e.response?.data?.message);
        }
    }
}
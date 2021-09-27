import { User } from "../../models/User";
import AuthService from "../../services/AuthService";

export const LOGIN_REQUEST_SUCCESS = '[Login] Login Request Success';
export const LOGOUT_REQUEST_SUCCESS = '[Login] Logout Request Success';

export function createLoginRequest(email: string, password: string) {
    return async (dispath: any, getState: any) => {
        try {
            const response = await AuthService.login(email, password);
            const {accessToken, user} = response.data;
            localStorage.setItem('token', accessToken);
            dispath(createLoginRequestSuccess(user));
        } catch (e: any) {
            alert(e.response?.data?.message);
        }
    }
}

export function createRegistrationRequest(email: string, password: string) {
    return async (dispath: any, getState: any) => {
        try {
            const response = await AuthService.registration(email, password);
            const {accessToken, user} = response.data;
            localStorage.setItem('token', accessToken);
            dispath(createLoginRequestSuccess(user));
        } catch (e: any) {
            alert(e.response?.data?.message);
        }
    }
}

export function createResetPassowrdRequest(email: string) {
    return async (dispath: any, getState: any) => {
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
            const response = await AuthService.refresh();
            const {accessToken, user} = response.data;
            localStorage.setItem('token', accessToken);
            dispath(createLoginRequestSuccess(user));
        } catch (e: any) {
            alert(e.response?.data?.message);
        }
    }
}
import { User } from "../../models/User";


export const LOGIN_REQUEST_SUCCESS = '[Login] Login Request Success';
export const LOGIN_REQUEST_ERROR = '[Login] Login Request Error';
export const LOGOUT_REQUEST_SUCCESS = '[Login] Logout Request Success';
export const SET_LOADING = '[Login] Set Loading';

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

export function createLogoutRequestSuccess() {
    return {
        type: LOGOUT_REQUEST_SUCCESS,
        payload: {}
    }
}
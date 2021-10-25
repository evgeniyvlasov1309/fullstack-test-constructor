import axios from "axios";
import { API_URL } from "../../../apiClient";
import { AnswerModel } from "../../../models/Answer";
import { AuthResponse } from "../../../models/response/AuthResponse";
import AuthService from "../../../services/AuthService";
import QuestionService from "../../../services/QuestionService";
import TestService from "../../../services/TestService";
import { createLoginRequestError, createLoginRequestSuccess, createLogoutRequestSuccess, setLoading } from "../../Login/Login.actions";
import { fetchTestRequestSuccess } from "./EditTest.actions";
import { testSelector } from "./EditTest.selectors";

export function fetchTestRequest(id: string) {
    return async (dispatch: any, getState: any, history: any) => {
        try {
            const { data } = await TestService.fetchTest(id);
            dispatch(fetchTestRequestSuccess(data));
        } catch (e: any) {
            alert(e.response?.data?.message);
        }
    }
}

export function createQuestionRequest(type: string, order: number, description: string, answers: AnswerModel[]) {
    return async (dispatch: any, getState: any, history: any) => {
        try {
            const testId = testSelector(getState()).id;
            await QuestionService.createQuestion(testId, type, order, description, answers);
            dispatch(fetchTestRequest(testId));
        } catch (e: any) {
            alert(e.response?.data?.message);
        }
    }
}

export function updateQuestionRequest(id: string, type: string, order: number, description: string, answers: AnswerModel[]) {
    return async (dispatch: any, getState: any, history: any) => {
        try {
            const testId = testSelector(getState()).id;
            await QuestionService.updateQuestion(id, type, order, description, answers);
            dispatch(fetchTestRequest(testId));
        } catch (e: any) {
            alert(e.response?.data?.message);
        }
    }
}

export function deleteQuestionRequest(id: string) {
    return async (dispatch: any, getState: any, history: any) => {
        try {
            const testId = testSelector(getState()).id;
            await QuestionService.deleteQuestion(id);
            dispatch(fetchTestRequest(testId));
        } catch (e: any) {
            alert(e.response?.data?.message);
        }
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
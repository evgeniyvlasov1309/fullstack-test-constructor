import { AnswerModel } from "../../../models/Answer";
import { TestModel } from "../../../models/Test";
import QuestionService from "../../../services/QuestionService";
import TestService from "../../../services/TestService";
import { testSelector } from "./EditTest.selectors";

export const FETCH_TEST_REQUEST_SUCCESS = '[Test] Fetch Test Request Success';
export const CLEAR_TEST_REQUEST = '[Test] Clear Test Request';

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

export function fetchTestRequestSuccess(test: TestModel) {
    return {
        type: FETCH_TEST_REQUEST_SUCCESS,
        payload: { test }
    }
}

export function clearTestRequest() {
    return {
        type: CLEAR_TEST_REQUEST,
        payload: { }
    }
}
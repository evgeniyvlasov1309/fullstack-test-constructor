import { CompletedTestModel } from "../../../models/CompletedTest";

export const FETCH_COMPLETED_TEST_REQUEST_SUCCESS = '[Test] Fetch Test Request Success';
export const CLEAR_COMPLETED_TEST_REQUEST = '[Test] Clear Test Request';

export function fetchCompletedTestRequestSuccess(test: CompletedTestModel) {
    return {
        type: FETCH_COMPLETED_TEST_REQUEST_SUCCESS,
        payload: { test }
    }
}

export function clearCompletedTestRequest() {
    return {
        type: CLEAR_COMPLETED_TEST_REQUEST,
        payload: { }
    }
}
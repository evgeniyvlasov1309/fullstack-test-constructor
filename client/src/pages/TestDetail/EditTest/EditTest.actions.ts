import { TestModel } from "../../../models/Test";


export const FETCH_TEST_REQUEST_SUCCESS = '[Test] Fetch Test Request Success';
export const CLEAR_TEST_REQUEST = '[Test] Clear Test Request';

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
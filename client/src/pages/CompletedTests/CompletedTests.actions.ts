import { CompletedTestModel } from "../../models/CompletedTest";

export const FETCH_COMPLETED_TESTS_REQUEST_SUCCESS = '[Tests] Completed Fetch Tests Request Success';

export function fetchCompletedTestsRequestSuccess(tests: CompletedTestModel[]) {
    return {
        type: FETCH_COMPLETED_TESTS_REQUEST_SUCCESS,
        payload: { tests }
    }
}
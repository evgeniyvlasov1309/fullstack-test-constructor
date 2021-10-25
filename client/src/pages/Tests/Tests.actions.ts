import { TestModel } from "../../models/Test";

export const FETCH_TESTS_REQUEST_SUCCESS = '[Tests] Fetch Tests Request Success';

export function fetchTestsRequestSuccess(tests: TestModel[]) {
    return {
        type: FETCH_TESTS_REQUEST_SUCCESS,
        payload: { tests }
    }
}
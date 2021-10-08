import { TestModel } from "../../models/Test";
import TestService from "../../services/TestService";

export const FETCH_TESTS_REQUEST_SUCCESS = '[Tests] Fetch Tests Request Success';

export function fetchTestsRequest() {
    return async (dispath: any, getState: any) => {
        try {
            const { data } = await TestService.fetchTests();
            dispath(fetchTestsRequestSuccess(data));
        } catch (e: any) {
            alert(e.response?.data?.message);
        }
    }
}

export function fetchTestsRequestSuccess(tests: TestModel[]) {
    return {
        type: FETCH_TESTS_REQUEST_SUCCESS,
        payload: { tests }
    }
}

export function deleteTestRequest(id: string) {
    return async (dispath: any, getState: any) => {
        try {
            await TestService.deleteTest(id);
            dispath(fetchTestsRequest());
        } catch (e: any) {
            alert(e.response?.data?.message);
        }
    }
}
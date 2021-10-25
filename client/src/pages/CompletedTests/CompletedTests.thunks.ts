import TestService from "../../services/TestService";
import { fetchCompletedTestsRequestSuccess } from "./CompletedTests.actions";

export function fetchCompletedTestsRequest() {
    return async (dispath: any, getState: any) => {
        try {
            const { data } = await TestService.fetchCompletedTests();
            dispath(fetchCompletedTestsRequestSuccess(data));
        } catch (e: any) {
            alert(e.response?.data?.message);
        }
    }
}
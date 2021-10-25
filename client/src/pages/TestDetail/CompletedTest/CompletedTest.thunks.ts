import TestService from "../../../services/TestService";
import { fetchCompletedTestRequestSuccess } from "./CompletedTest.actions";

export function fetchCompletedTestRequest(id: string) {
    return async (dispatch: any, getState: any, history: any) => {
        try {
            const { data } = await TestService.fetchCompletedTest(id);
            dispatch(fetchCompletedTestRequestSuccess(data));
        } catch (e: any) {
            alert(e.response?.data?.message);
        }
    }
}
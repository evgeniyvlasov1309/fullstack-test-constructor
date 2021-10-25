import TestService from "../../services/TestService";
import { fetchTestsRequestSuccess } from "./Tests.actions";

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
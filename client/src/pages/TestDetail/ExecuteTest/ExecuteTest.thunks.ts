import { UserAnswer } from "../../../models/UserAnswer";
import TestService from "../../../services/TestService";

export function completeTestRequest(id: string, answers: UserAnswer[]) {
    return async (dispatch: any, getState: any, history: any) => {
        try {
            await TestService.completeTest(id, answers);
            history.push("/tests/completed");
        } catch (e: any) {
            alert(e.response?.data?.message);
        }
    }
}
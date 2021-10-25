import TestService from "../../../services/TestService";

export function createTestRequest(title: string) {
    return async (dispatch: any, getState: any, history: any) => {
        try {
            const { data } = await TestService.createTest(title);
            console.log(data);
            history.push(`/tests/${data.id}`);
        } catch (e: any) {
            alert(e.response?.data?.message);
        }
    }
}
import { CompletedTestPageState } from "./CompletedTest.page";

export function completedTestSelector(state: CompletedTestPageState) {
    return state.testDetail.completed.test;
}
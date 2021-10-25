import { CompletedTestsPageState } from "./CompletedTests.page";

export function completedTestsSelector(state: CompletedTestsPageState) {
    return state.completedTests.tests;
}
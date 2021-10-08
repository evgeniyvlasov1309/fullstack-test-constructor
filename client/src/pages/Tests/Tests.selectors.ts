import { TestsPageState } from "./Tests.page";

export function testsSelector(state: TestsPageState) {
    return state.tests.tests;
}
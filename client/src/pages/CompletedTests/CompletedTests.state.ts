import { CompletedTestModel } from "../../models/CompletedTest";

export interface CompletedTestsState {
    tests: CompletedTestModel[];
}
export function getDefaultState(): CompletedTestsState {
    return {
        tests: [],
    };
}
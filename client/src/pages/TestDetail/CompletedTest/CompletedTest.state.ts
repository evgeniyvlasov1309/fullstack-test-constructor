import { CompletedTestModel } from "../../../models/CompletedTest";

export interface CompletedTestState {
    test: CompletedTestModel;
}

export function getDefaultState(): CompletedTestState {
    return {
        test: {} as CompletedTestModel
    }
}
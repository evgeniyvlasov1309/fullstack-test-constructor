import { TestModel } from "../../../models/Test";

export interface ExecuteTestState {
    test: TestModel;
}

export function getDefaultState(): ExecuteTestState {
    return {
        test: {} as TestModel
    }
}
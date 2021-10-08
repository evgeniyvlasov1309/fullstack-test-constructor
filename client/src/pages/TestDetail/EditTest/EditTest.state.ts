import { TestModel } from "../../../models/Test";

export interface EditTestState {
    test: TestModel;
}

export function getDefaultState(): EditTestState {
    return {
        test: {} as TestModel
    }
}
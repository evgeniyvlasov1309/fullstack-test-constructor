import { TestModel } from "../../models/Test";

export interface TestsState {
    tests: TestModel[];
}
export function getDefaultState(): TestsState {
    return {
        tests: [],
    };
}
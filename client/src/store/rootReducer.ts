import { combineReducers } from "redux";
import completedTestsReducer from "../pages/CompletedTests/CompletedTests.reducer";
import loginReducer from "../pages/Login/Login.reducer";
import {testDetailReducer} from "../pages/TestDetail/TestDetail.reducer";
import testsReducer from "../pages/Tests/Tests.reducer";

export interface ActionType {
    type: string;
    payload: any;
}

export default function createReducer() {
    return combineReducers({
        login: loginReducer,
        tests: testsReducer,
        completedTests: completedTestsReducer,
        testDetail: testDetailReducer
    });
}
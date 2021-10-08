import { combineReducers } from "redux";
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
        testDetail: testDetailReducer
    });
}
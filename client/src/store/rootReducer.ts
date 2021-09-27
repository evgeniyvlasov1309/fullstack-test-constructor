import { combineReducers } from "redux";
import loginReducer from "../pages/Login/Login.reducer";

export interface ActionType {
    type: string;
    payload: any;
}

export default function createReducer() {
    return combineReducers({
        login: loginReducer,
    });
}
import { combineReducers } from "redux";
import EditTestReducer from "./EditTest/EditTest.reducer";

export const testDetailReducer = combineReducers({
    edit: EditTestReducer,
});
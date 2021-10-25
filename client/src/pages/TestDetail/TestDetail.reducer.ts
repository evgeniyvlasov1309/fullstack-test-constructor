import { combineReducers } from "redux";
import completedTestReducer from "./CompletedTest/CompletedTest.reducer";
import editTestReducer from "./EditTest/EditTest.reducer";

export const testDetailReducer = combineReducers({
    edit: editTestReducer,
    completed: completedTestReducer
});
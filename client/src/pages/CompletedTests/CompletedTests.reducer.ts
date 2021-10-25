import { ActionType } from "../../store/rootReducer";
import { FETCH_COMPLETED_TESTS_REQUEST_SUCCESS } from "./CompletedTests.actions";
import { CompletedTestsState, getDefaultState } from "./CompletedTests.state";

export default function completedTestsReducer(state: CompletedTestsState = getDefaultState(), action: ActionType) {
    switch (action.type) {
        case FETCH_COMPLETED_TESTS_REQUEST_SUCCESS:
            return {
                ...state,
                tests: action.payload.tests
            }
            default:
                return state;
    }
}
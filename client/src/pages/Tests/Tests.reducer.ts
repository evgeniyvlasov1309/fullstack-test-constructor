import { ActionType } from "../../store/rootReducer";
import { FETCH_TESTS_REQUEST_SUCCESS } from "./Tests.actions";
import { getDefaultState, TestsState } from "./Tests.state";

export default function testsReducer(state: TestsState = getDefaultState(), action: ActionType) {
    switch (action.type) {
        case FETCH_TESTS_REQUEST_SUCCESS:
            return {
                ...state,
                tests: action.payload.tests
            }
            default:
                return state;
    }
}
import { ActionType } from "../../../store/rootReducer";
import { CLEAR_COMPLETED_TEST_REQUEST, FETCH_COMPLETED_TEST_REQUEST_SUCCESS } from "./CompletedTest.actions";
import { getDefaultState, CompletedTestState } from "./CompletedTest.state";

export default function completedTestReducer(state: CompletedTestState = getDefaultState(), action: ActionType) {
    switch(action.type) {
        case FETCH_COMPLETED_TEST_REQUEST_SUCCESS:
            return {
                ...state,
                test: action.payload.test,
            }
        case CLEAR_COMPLETED_TEST_REQUEST:
            return {
                ...getDefaultState(),
            }
        default:
            return state;
    }
}
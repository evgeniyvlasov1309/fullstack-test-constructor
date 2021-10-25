import { ActionType } from "../../../store/rootReducer";
import { CLEAR_TEST_REQUEST, FETCH_TEST_REQUEST_SUCCESS } from "./EditTest.actions";
import { getDefaultState, EditTestState } from "./EditTest.state";

export default function editTestReducer(state: EditTestState = getDefaultState(), action: ActionType) {
    switch(action.type) {
        case FETCH_TEST_REQUEST_SUCCESS:
            return {
                ...state,
                test: action.payload.test,
            }
        case CLEAR_TEST_REQUEST:
            return {
                ...getDefaultState(),
            }
        default:
            return state;
    }
}
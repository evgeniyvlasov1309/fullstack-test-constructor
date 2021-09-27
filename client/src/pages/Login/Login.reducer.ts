import { ActionType } from "../../store/rootReducer";
import { LOGIN_REQUEST_SUCCESS, LOGOUT_REQUEST_SUCCESS } from "./Login.actions";
import { getDefaultState, LoginState } from "./Login.state";

export default function loginReducer(state: LoginState = getDefaultState(), action: ActionType) {
    switch(action.type) {
        case LOGIN_REQUEST_SUCCESS:
            return {
                ...state,
                user: action.payload.user,
                isAuth: true
            }
        case LOGOUT_REQUEST_SUCCESS:
            return {
                ...getDefaultState(),
            }
        default:
            return state;
    }
}
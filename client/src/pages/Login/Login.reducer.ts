import { ActionType } from "../../store/rootReducer";
import { LOGIN_REQUEST_ERROR, LOGIN_REQUEST_SUCCESS, LOGOUT_REQUEST_SUCCESS, SET_LOADING } from "./Login.actions";
import { getDefaultState, LoginState } from "./Login.state";

export default function loginReducer(state: LoginState = getDefaultState(), action: ActionType) {
    switch(action.type) {
        case LOGIN_REQUEST_SUCCESS:
            return {
                ...state,
                user: action.payload.user,
                loading: false,
                isAuth: true
            }
        case LOGIN_REQUEST_ERROR:
            return {
                ...state,
                loading: false,
                isAuth: false
            }
        case LOGOUT_REQUEST_SUCCESS:
            return {
                ...getDefaultState(),
                isAuth: false,
                loading: false,
            }
        case SET_LOADING:
            return {
                loading: action.payload.loading,
            }
        default:
            return state;
    }
}
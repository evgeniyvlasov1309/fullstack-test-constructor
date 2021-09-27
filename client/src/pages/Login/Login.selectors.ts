import { LoginPageState } from "./Login.page"

export function isAuthSelector(state: LoginPageState) {
    return  state.login.isAuth;
}

export function userSelector(state: LoginPageState) {
    return  state.login.user;
}
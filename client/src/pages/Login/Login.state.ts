import { User } from "../../models/User";

export interface LoginState {
    user: User;
    isAuth: Boolean
}
export function getDefaultState(): LoginState {
    return {
        user: {} as User,
        isAuth: false
    };
}
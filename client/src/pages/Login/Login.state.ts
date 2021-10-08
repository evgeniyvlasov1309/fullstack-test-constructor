import { User } from "../../models/User";

export interface LoginState {
    user: User;
    isAuth: Boolean | null;
    loading: Boolean;
}
export function getDefaultState(): LoginState {
    return {
        user: {} as User,
        isAuth: null,
        loading: true
    };
}
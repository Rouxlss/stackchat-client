import { IUser } from '../../interfaces/user';
import {AuthState} from './';

type AuthActionType =
    | { type: '[Auth] - Login', payload: {
        user: IUser,
        isLoading: boolean,
    }}
    | { type: '[Auth] - Logout'}

export const authReducer = (state: AuthState, action: AuthActionType): AuthState => {

    switch (action.type) {
        case '[Auth] - Login':
            return {
                ...state,
                isLoggedIn: true,
                user: action.payload.user,
                isLoading: action.payload.isLoading
            }
        case '[Auth] - Logout':
            return {
                ...state,
                isLoggedIn: false,
                user: undefined,
                isLoading: false
            }
        default:
            return state;
    }

}
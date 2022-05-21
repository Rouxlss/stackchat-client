import { FC, useReducer, useEffect } from 'react';
import { stackChatApi } from '../../api';
import { IUser } from '../../interfaces/user';
import { AuthContext, authReducer } from './';
import Cookies from 'js-cookie';

export interface AuthState {
    isLoggedIn: boolean;
    user?: IUser;
    isLoading: boolean;
}

const Auth_INITIAL_STATE: AuthState = {
    isLoggedIn: false,
    user: undefined,
    isLoading: true
}

export const AuthProvider: FC = ({ children }) => {
    const [state, dispatch] = useReducer(authReducer, Auth_INITIAL_STATE);

    useEffect(() => {
        checkToken();
    }, []);

    const checkToken = async () => {

        if(!Cookies.get('accessToken')) return;

        try {
            const { data } = await stackChatApi.get('/auth/validate-token', {withCredentials: true});
            console.log(data);
            const { token, user } = data;
            Cookies.set('accessToken', token);
            dispatch({ type: '[Auth] - Login', payload: user });
            return true;
        } catch (error) {
            Cookies.remove('accessToken');
        }

    }

    const loginUser = async (code: string, number: string): Promise<boolean> => {
        try {

            const { data } = await stackChatApi.put('/auth/verifycode', { code, number });
            const { token, user } = data;
            Cookies.set('accessToken', token);
            dispatch({ type: '[Auth] - Login', payload: user });
            return true;

        } catch (error) {
            console.error(error);
            return false;
        }
    }

    const logoutUser = async (): Promise<boolean> => {
        try {

            stackChatApi.delete('/auth/logout', {withCredentials: true});
            dispatch({ type: '[Auth] - Logout'});
            return true;

        } catch (error) {
            console.error(error);
            return false;
        }
    }

    return (
        <AuthContext.Provider
            value={{
                ...state,
                loginUser,
                logoutUser
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}
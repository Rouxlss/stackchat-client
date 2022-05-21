import { createContext } from "react";
import { IUser } from "../../interfaces/user";

interface ContextProps {
    isLoggedIn: boolean;
    user?: IUser;
    isLoading: boolean;
    loginUser: (code: string, number: string) => Promise<boolean>;
    logoutUser: () => Promise<boolean>;
}

export const AuthContext = createContext({} as ContextProps);
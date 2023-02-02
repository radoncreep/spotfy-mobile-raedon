import { createContext, PropsWithChildren, useReducer, Dispatch } from "react"


type UserState = {
    username: string;
    dob: string;
    email: string;
    password: string
    gender: string;
}

type AuthContextProps = {
    state: UserState | null;
    dispatch: Dispatch<AuthReducerAction>
}

type UserReducerState = UserState;

type AuthReducerAction = {
    type: "login" | "logout";
    payload?: UserReducerState;
}

export const AuthContext = createContext<AuthContextProps>({
    state: null,
    dispatch: () => null
})


const authReducer = (
    state: UserReducerState | null = null, 
    {type, payload}: AuthReducerAction): 
UserReducerState | null => {
    switch(type) {
        case 'login':
            return payload!;
        case 'logout':
            return null;
        default: 
            return null
    }
}

export const AuthContextProvider = ({ children }: PropsWithChildren) => {
    const [ state, dispatch ]  = useReducer(authReducer, null);
    
    return (
        <AuthContext.Provider value={{ state , dispatch }}>
            {children}
        </AuthContext.Provider>
    )
}
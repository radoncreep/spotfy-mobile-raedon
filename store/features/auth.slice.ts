import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { setItemInCache } from "../../utils/cache";
import { AppRootState } from "../store";

type StringOrNull = string | null;

interface UserState {
    username: string;
    dob: string;
    email: string;
    password: string
    gender: string;
}

// cast the type of the state cause ts tightens 
// it to one type even though a union type is declare for this variable
const initialUAuthState = {} as UserState;

export const authSlice = createSlice({
    name: "user",
    initialState: initialUAuthState,
    reducers: {
        login: (state: UserState, action: PayloadAction<UserState>): UserState => {
            setItemInCache('user', action.payload);

            state = action.payload;
            return state;
        },
        logout: (state: UserState) => {
            state = initialUAuthState;
        }
    }
})


// action creators
export const { login, logout } = authSlice.actions;

// function used to select state
export const selectAuth = (state: AppRootState) => state.auth;

export default authSlice.reducer;
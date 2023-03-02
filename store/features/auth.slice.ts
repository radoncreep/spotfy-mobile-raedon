import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppRootState } from "../store";

interface UserState {
    username: string;
    dob: string;
    email: string;
    password: string
    gender: string;
}

// cast the type of the state cause ts tightens 
// it to one type even though a union type is declare for this variable
const initialUAuthState = {} as UserState | null;

export const authSlice = createSlice({
    name: "user",
    initialState: initialUAuthState,
    reducers: {
        login: (state, action: PayloadAction<UserState>) => {
            state = action.payload;
        },
        logout: (state) => {
            state = null;
        }
    }
})


// action creators
export const { login, logout } = authSlice.actions;

// function used to select state
export const selectAuth = (state: AppRootState) => state.auth;

export default authSlice.reducer;
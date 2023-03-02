import { configureStore } from "@reduxjs/toolkit";

import authReducer from "./features/auth.slice";


export const appStore = configureStore({
    reducer: {
        auth: authReducer
    }
});

export type AppRootState = ReturnType<typeof appStore.getState>;

export type AppDispatch = typeof appStore.dispatch;
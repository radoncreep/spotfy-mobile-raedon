import { configureStore } from "@reduxjs/toolkit";

import authReducer from "./features/auth.slice";
import playerReducer from "./features/player.slice";


export const appStore = configureStore({
    reducer: {
        auth: authReducer,
        player: playerReducer
    }
});

export type AppRootState = ReturnType<typeof appStore.getState>;

export type AppDispatch = typeof appStore.dispatch;
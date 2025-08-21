import { configureStore } from "@reduxjs/toolkit";
import loadingReducer from "./reducers/loading";
import authReducer from "./reducers/auth";
export const store = configureStore({
    reducer: {
        auth: authReducer,
        loading: loadingReducer,
    }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
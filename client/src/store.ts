import { configureStore } from "@reduxjs/toolkit";
import loadingReducer from "./reducers/loading";
import authReducer from "./reducers/auth";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
const authPersistConfig = {
    key: "auth",
    storage,
    whitelist: ["user", "status"], // chỉ persist những field này
};

const persistedAuthReducer = persistReducer(authPersistConfig, authReducer);

export const store = configureStore({
    reducer: {
        auth: persistedAuthReducer,
        loading: loadingReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false, // tránh warning khi redux-persist lưu non-serializable
        }),
});

export const persistor = persistStore(store);
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
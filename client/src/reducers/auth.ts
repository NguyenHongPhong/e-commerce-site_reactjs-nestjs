import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IDataUserDto } from "../types/dto/user.dto";
export interface AuthState {
    user: IDataUserDto | null;
    status?: string;
}
const initialState: AuthState = { user: null, status: "" };

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        authenticated(state, action: PayloadAction<AuthState>) {
            state.user = action.payload.user;
            state.status = "authenticated";
        },
        unauthenticated(state) {
            state.user = null;
            state.status = "guest";
        },
    },
});

export const { authenticated, unauthenticated } = authSlice.actions;
export default authSlice.reducer;

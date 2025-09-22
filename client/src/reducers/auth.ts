import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IProfileUserDto } from "../types/dto/user.dto";
export interface AuthState {
    user: IProfileUserDto | null;
    status?: "loading" | "authenticated" | "unauthenticated";
}
const initialState: AuthState = {
    user: null,
    status: "loading" // mặc định app vừa khởi động
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        authenticated(state, action: PayloadAction<IProfileUserDto>) {
            state.user = action.payload;
            state.status = "authenticated";
        },
        unauthenticated(state) {
            state.user = null;
            state.status = "unauthenticated";
        },
    },
});

export const { authenticated, unauthenticated } = authSlice.actions;
export default authSlice.reducer;

import { createSlice } from '@reduxjs/toolkit';
import { ILoadingState } from '../types/ui';

const initialState: ILoadingState = {
    value: false
}

const loadingSlice = createSlice({
    name: 'loading',
    initialState,
    reducers: {
        enableLoading: (state) => {
            state.value = true;
        },
        disableLoading: (state) => {
            state.value = false;
        }
    },
});


export const { enableLoading, disableLoading } = loadingSlice.actions;
export default loadingSlice.reducer;
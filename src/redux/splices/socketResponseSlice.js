import { createSlice } from "@reduxjs/toolkit";

export const socketResponseSlice = createSlice({
    name: 'socketResponse',
    initialState: {
        response: null
    },
    reducers: {
        setSocketResponse: (state, action) => {
            state.response = action.payload
        }
    }
});

export const { setSocketResponse } = socketResponseSlice.actions;

export default socketResponseSlice.reducer;
import { createSlice } from "@reduxjs/toolkit";

export const alertSlice = createSlice({
    name: 'alerts',
    initialState: {
        list: []
    },
    reducers: {
        setAlertsList: (state, action) => {
            state.list = action.payload
        },

        closeAlert: (state, action) => {
            state.list = state.list.filter(alert => alert.message !== action.payload.message);
        }
    }
});

export const { setAlertsList, closeAlert } = alertSlice.actions;

export default alertSlice.reducer;
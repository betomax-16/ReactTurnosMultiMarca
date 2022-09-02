import { createSlice } from "@reduxjs/toolkit";

export const sesionSlice = createSlice({
    name: 'sesion',
    initialState: {
        branch: null,
        module: null,
        currentTurn: null
    },
    reducers: {
        setBranch: (state, action) => {
            state.branch = action.payload
        },
        setModule: (state, action) => {
            state.module = action.payload
        },
        setCurrentTurn: (state, action) => {
            state.currentTurn = action.payload
        }
    }
});

export const { setBranch, setModule, setCurrentTurn } = sesionSlice.actions;

export default sesionSlice.reducer;
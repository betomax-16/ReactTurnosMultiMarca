import { createSlice } from "@reduxjs/toolkit";
import jwt from 'jwt-decode';

export const currentUserSlice = createSlice({
    name: 'currentUser',
    initialState: {
        user: null
    },
    reducers: {
        saveCurrentUser: (state, action) => {
            try {
                const user = jwt(action.payload);
                const dateExp = new Date(user.exp);
                const dateNow = new Date().getTime();
                if (dateExp < dateNow / 1000) {
                    throw new Error('Token caducado.');
                }
                localStorage.setItem('token', action.payload);
                state.user = user;
            } catch (error) {
                throw error;
            }
        },
        loadCurrentUser: (state) => {
            try {
                if (!state.user) {
                    const token = localStorage.getItem('token');
                    if (token) {
                        const user = jwt(token);
                        const dateExp = new Date(user.exp);
                        const dateNow = new Date().getTime();
                        if (dateExp < dateNow / 1000) {
                            throw new Error('Token caducado.');
                        }
                        state.user = user;
                    }
                }
            } catch (error) {
                throw error;
            }
        },
        clearCurrentUser: (state) => {
            localStorage.clear();
            state.user = null;
        }
    }
});

export const { saveCurrentUser, clearCurrentUser, loadCurrentUser } = currentUserSlice.actions;

export default currentUserSlice.reducer;
import { configureStore } from "@reduxjs/toolkit";
import currentUserReducer from "../splices/currentUserSlice";
import alertReducer from "../splices/alertSlice";
import sesionReducer from "../splices/sesionSlice";
import socketResponseReducer from "../splices/socketResponseSlice";

export default configureStore({
    reducer: {
        currentUser: currentUserReducer,
        alert: alertReducer,
        sesion: sesionReducer,
        socketResponse: socketResponseReducer
    }
});
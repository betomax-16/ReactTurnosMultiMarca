import { configureStore } from "@reduxjs/toolkit";
import currentUserReducer from "../splices/currentUserSlice";
import alertReducer from "../splices/alertSlice";

export default configureStore({
    reducer: {
        currentUser: currentUserReducer,
        alert: alertReducer
    }
});
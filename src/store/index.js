import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authReducer";
import fetchAllUsersReducer from "./fetchAllUsersReducer";


const store = configureStore({
    reducer: {
        auth: authReducer,
        fetchallusers: fetchAllUsersReducer,

    }
});

export default store;
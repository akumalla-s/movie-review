import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authReducer";
import movieReducer from "./movieReducer";


const store = configureStore({
    reducer: {
        auth: authReducer,
        movies: movieReducer
    }
});

export default store;
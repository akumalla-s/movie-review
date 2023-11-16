import { createSlice } from "@reduxjs/toolkit";

const authReducer = createSlice({
    name: 'auth',
    initialState: { isLoggedIn: false },
    reducers: {
        login(state){
            state.isLoggedIn = true;
        },
        logout(state){
            state.isLoggedIn = false;
        },
    }
});


export default authReducer;
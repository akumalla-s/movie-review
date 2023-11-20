import { createSlice } from "@reduxjs/toolkit";

const fetchAllUsersSlice = createSlice({
    name: 'fetchallusers',
    initialState: {
        user: "",
        password: "",
        admin: false,
        isActive: false,
        _id: ""
    },
    reducers:{
        storeAllUsers(state,action){

        }
    }
});

export const fetchAllUsersActions = fetchAllUsersSlice.actions;
export default fetchAllUsersSlice.reducer;
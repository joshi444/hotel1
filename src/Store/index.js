
import { createSlice,configureStore } from "@reduxjs/toolkit";

const intialstate = {isauthenticated:false}

const authSlice = createSlice({
    name:"authenticated",
    initialState:intialstate,
    reducers : {
        login(state){
           state. isauthenticated=true
        },

        logout(state){
            state.isauthenticated=false
        }
        
    }
})

const store = configureStore({
    reducer: authSlice.reducer
})

export const authactions = authSlice.actions;
export default store;
import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    currentUser : '',
    loading : false,
    error: false

}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        loginStart: (state)=>{
            state.loading = true;
        },
        loginSuccess: (state, action)=>{
            state.loading = false;
            state.currentUser = action.payload
        },
        loginFail: (state,action)=>{
            state.loading = false;
           
        },
        logout:(state)=>{
            return initialState
        }
    }
})

export const {loginStart, loginSuccess, loginFail, logout} = userSlice.actions

export default userSlice.reducer
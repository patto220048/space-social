import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    currentSocket : '',
    loading : false,
    error: false

}

export const socketSlice = createSlice({
    name: 'socket',
    initialState,
    reducers: {
        socketStart: (state)=>{
            state.loading = true;
        },
        socketSuccess: (state, action)=>{
            state.loading = false;
            state.currentSocket = action.payload
        },
        socketFail: (state,action)=>{
            state.loading = false;
           
        },
        
      
    }
})

export const {socketStart, socketSuccess, socketFail} = socketSlice.actions

export default socketSlice.reducer
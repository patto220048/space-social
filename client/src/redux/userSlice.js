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
        loginFail: (state)=>{
            state.loading = false;
           
        },
        logout:(state)=>{
            return initialState
        },
        follow:(state, action)=>{
            if(state.currentUser.flowing.includes(action.payload)){
                state.currentUser.flowing.splice(
                    state.currentUser.flowing.findIndex(
                        pagramId => pagramId === action.payload),1)
            }
            else{
                state.currentUser.flowing.push(action.payload)
            }

        }
        ,
        pendding:(state, action)=>{
            if(state.currentUser.pendding.includes(action.payload)){
                state.currentUser.pendding.splice(
                    state.currentUser.pendding.findIndex(
                        pagramId => pagramId === action.payload),1)
            }
            else{
                state.currentUser.pendding.push(action.payload)
            }

        }
      
    }
})

export const {loginStart, loginSuccess, loginFail, logout, follow, pendding} = userSlice.actions

export default userSlice.reducer
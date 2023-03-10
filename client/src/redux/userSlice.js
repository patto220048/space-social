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
        waitting:(state, action)=>{
            if(state.currentUser.waitting.includes(action.payload)){
                state.currentUser.waitting.splice(
                    state.currentUser.waitting.findIndex(
                        pagramId => pagramId === action.payload),1)
            }
            else{
                state.currentUser.waitting.push(action.payload)
            }

            
        }
        ,
        friend:(state, action)=>{
            if(!state.currentUser.friend.includes(action.payload)){
                state.currentUser.friend.push(action.payload)
                state.currentUser.pendding.splice(
                    state.currentUser.waitting.findIndex(
                        pagramId => pagramId === action.payload),1)
            }
            else{
                state.currentUser.friend.pull(action.payload)
            }


        }
        ,
        remove:(state, action)=>{
            if(state.currentUser.friend.includes(action.payload)){
                state.currentUser.friend.splice(
                    state.currentUser.friend.findIndex(
                        pagramId => pagramId === action.payload),1)
            }
           
        }

      
    }
})

export const {loginStart, loginSuccess, loginFail, logout, follow, waitting, friend ,remove} = userSlice.actions

export default userSlice.reducer
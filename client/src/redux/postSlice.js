import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    currentPost : null,
    loading : false,
    error: false

}

export const postSlice = createSlice({
    name: 'post',
    initialState,
    reducers: {
        postStart: (state)=>{
            state.loading = true;
        },
        postSuccess: (state, action)=>{
            state.loading = false;
            state.currentPost = action.payload
        },
        postFail: (state,action)=>{
            state.loading = false;
           
        },
        likes:(state, action)=>{
            state.currentPost.map((post, index)=>{
                if(post._id === action.payload.postId ){
                    if(post.like.includes(action.payload.userId)){
                        post.like.splice(
                            post.like.findIndex(userId=>userId===action.payload.userId)
                        ,1)
                    }
                    else{
                        post.like.push(action.payload.userId)
                    }
                }
            })
                
        }

    }
})

export const {postStart, postSuccess, postFail, likes} = postSlice.actions

export default postSlice.reducer
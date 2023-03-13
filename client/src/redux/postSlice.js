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
        logoutPost:(state)=>{
            return initialState

        }
        ,
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
                
        },
        deletePost:(state, action) =>{
            state.currentPost.map(post=>{
                if (post._id === action.payload) {
                    state.currentPost.splice(state.currentPost.findIndex(
                        postId => postId !== action.payload
                    ),1)
                }
            }
             
            )


        },
        postAdd: (state, action)=>{
            state.currentPost.push(action.payload)
            
        }, 
        delImg : (state, action)=>{
            state.loading = false;
            state.currentPost.map(post=>{
                if(post._id === action.payload.postId )
                {
                   post.imgPost = action.payload.imgPost
                }
            }) 
            

        },
        postUpdate : (state, action)=>{
            state.loading = false;
            state.currentPost.map(post=>{
                if(post._id === action.payload.postId )
                {
                    post.imgPost = action.payload.imgPost
                    post.desc = action.payload.desc
                }
            })
            

        }

    }
})

export const {postStart, postSuccess, postFail, likes, deletePost ,postAdd,postUpdate,delImg, logoutPost} = postSlice.actions

export default postSlice.reducer
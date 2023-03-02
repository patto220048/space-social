
import "./comments.scss"
import { useSelector } from "react-redux";
import { useEffect, useRef, useState } from "react";
import axios from "axios";

import Comment from "../comment/Comment";
import ReactLoading from 'react-loading';
import SendIcon from '@mui/icons-material/Send';
import {io} from 'socket.io-client'

function Comments({post}) {
    const socket = useRef(io('ws://localhost:8000'))
    const  {currentUser} = useSelector((state) => state.user)
    const noAvatar = process.env.REACT_APP_PUBLIC_FOLDER + "no_avatar1.jpg" 
    const [comments, setComments] = useState([])
    const [desc , setDesc] = useState("")
    const [isloading, setIsLoading] = useState(false)
    const [decsSocket, setDecsSocket ] = useState(null) // *

    ///socketio handle
    useEffect(()=>{
        // take data from sever
        socket.current.on('getDecs', data=>{
            setDecsSocket({
                userId: data.user.userId,
                comment : data.decs,
                postId : data.postId,
                createdAt: Date.now(),
                _id: data.cmtId
            })
        })
    },[])

    useEffect(()=>{
        decsSocket && setComments((prev)=>[...prev, decsSocket])
    },[decsSocket])


    
    useEffect(()=>{

        const fectchComment = async()=>{
            setIsLoading(true)
            
          try{
            const res = await axios.get(`/comment/${post._id}/find`)
            setComments(res.data)
            setIsLoading(false)

          }
          catch(err){
            console.log(err.message)
            
        }
        }
    fectchComment()
    },[post._id])

    const handleCreateComment = (e) => {
        e.preventDefault()
        const createComment = async() => {
            //soket io send data to server
            socket.current.emit('getCmt',{
                userId : currentUser._id , 
                decs: desc ,
                postId: post._id 
            })
            try {
                const res = await axios.post(`/comment/create`,{
                    postId : post._id ,
                    comment: desc   
                })
                setDesc('') 

              
            } catch (error) {
                console.log(error.message)
                
            }
        }
        createComment()
    }

    return ( 
        <div className="comments-container">
            <div className="comments-wapper">
                <div className="comments-item">
                    <img className="comments-img" src={currentUser.userImg || noAvatar} alt={currentUser.userImg} />
                    <textarea 
                        className="comments-input"
                        type="text" 
                        placeholder="Enter your comment here..."
                        value={desc}
                        onChange={(e)=>setDesc(e.target.value)}
                    />
                 
                   {!desc ? <button type="submit" disabled className="comments-button1 active" onClick={handleCreateComment}>
                        Enter<SendIcon/>
                    </button>:
                   <button type="submit" className="comments-button" onClick={handleCreateComment}>
                        Enter<SendIcon/>
                    </button>
                    }
                
                </div>
                
            </div>
            <div className="comment">
                { isloading ?
                 <ReactLoading type={"cylon"}/> :
                comments.map((comment,index)=>(
                    
                    <Comment  comment={comment} key={index}/>
                ))
                }

              

            </div>
                
                
        
        </div>
        

    
        

     );
}

export default Comments;
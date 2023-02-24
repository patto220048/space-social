
import "./comments.scss"
import { useSelector } from "react-redux";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import {io} from 'socket.io-client'



import Comment from "../comment/Comment";
import ReactLoading from 'react-loading';
import SendIcon from '@mui/icons-material/Send';

function Comments({post}) {
    const  {currentUser} = useSelector((state) => state.user)
    const noAvatar = process.env.REACT_APP_PUBLIC_FOLDER + "no_avatar1.jpg" 
    const [comments, setComments] = useState([])
    const [desc , setDesc] = useState('')
    const [isloading, setIsLoading] = useState(true)
    const [decsSocket, setDecsSocket ] = useState(null) // *
    const socket = useRef()

    ///socketio handle
    useEffect(()=>{

        //default
        socket.current = io('ws://localhost:8000')

        // take data from sever
        socket.current.on('getDecs', data=>{
            setDecsSocket({
                userId: data.user.userId,
                comment : data.decs,
                postId : data.postId,
                createdAt: Date.now()
            })
        })
    },[])

    useEffect(()=>{
        decsSocket && setComments((prev)=>[...prev, decsSocket])
    },[decsSocket])

 
    useEffect(()=>{
        socket.current.emit('addUser',currentUser._id)
        socket.current.on('getUsers' , user => {
            console.log(user)
        })
       
    },[currentUser])
    ///////



    useEffect(()=>{
        const fectchComment = async()=>{
            setIsLoading(true)
          try{
            const res = await axios.get(`/comment/${post._id}/find`)
            setComments(res.data)
        
          }
          catch(err){
            console.log(err.message)
            
        }
        }
    fectchComment()
    setIsLoading(false)
    },[post._id])

    const handleCreateComment = (e) => {
        e.preventDefault()
        const createComment = async() => {
            //soket io send data to server
            socket.current.emit('getCmt',{userId : currentUser._id , decs: desc , postId: post._id  })
            try {
                const res = await axios.post(`comment/create`,{
                    postId : post._id ,
                    comment: desc   
                })
                
            } catch (error) {
                console.log(error.message)
                
            }
        }
        createComment()
        setDesc(' ')
        

       

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
                { 
                comments.map((comment,index)=>(
                    
                    <Comment  comment={comment} key={index}/>
                ))}

              

            </div>
                
                
        
        </div>
        

    
        

     );
}

export default Comments;

import "./comment.scss"
import axios from "axios"
import { useEffect, useRef, useState } from "react"
import {format} from "timeago.js"
import {io} from 'socket.io-client'

import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { useSelector } from "react-redux"

function Comment({comment}) {

    const [openDelCmt, setOpenDelCmt] = useState(false)
    const noAvatar = process.env.REACT_APP_PUBLIC_FOLDER + "no_avatar1.jpg" 
    const [user ,setUser] = useState([])
    useEffect(()=>{
        const fecthUser = async()=>{
            try{
                const res = await axios.get(`/user/find/${comment.userId}`)
                setUser(res.data)
            }
            catch(err){
                console.log(err.message);
            }
        }
        fecthUser()

    },[comment.userId])





    const  handleDelCmt = () =>{
        
        const fetchDelCmt = async()=>{
           try {
            setOpenDelCmt(false)
            const res = await axios.delete(`/comment/${comment._id}/delete`)
            alert('Comment deleted successfully!!')
            window.location.reload(true);

           } catch (error) {
            alert("Opps!! You just deleted your comment. ")
            setOpenDelCmt(false)
           }
        }
        fetchDelCmt()
    }
    return (
        <div className="comment-container">
            <div className="comment-wapper">
                <div className="comment-items">
                    <img src={user.userImg || noAvatar} alt={user.userImg} className="comment-user-img" />
                    <div className="comment">
                        <span className="comment-name">
                           {user.username}
                            <span className="time">{format(comment.createdAt)}</span>
                            <button className="btn" onClick={()=>setOpenDelCmt(!openDelCmt)} >
                                <MoreHorizIcon fontSize="large"/>
                                </button>
                            <div className="option"> 
                               {openDelCmt && <button onClick={handleDelCmt}>Delete</button>}
                            </div>
                        </span>
                       

                        <p className="comment-text">
                            {comment.comment}
                           
                        </p>
                    </div>


                </div>


            </div>
            
        </div>
     );
}

export default Comment;
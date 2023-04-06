
import "./comment.scss"
import axios from "axios"
import { useEffect, useRef, useState } from "react"
import {format} from "timeago.js"
import { Link, useNavigate } from "react-router-dom";



import MoreHorizIcon from '@mui/icons-material/MoreHoriz';

function Comment({comment,socket}) {
    const axiosInstance = axios.create({
        baseURL : process.env.REACT_APP_API_URL,
        withCredentials: true,
        headers: {
        "Content-type": "application/json",
        },
    })
    const navigate = useNavigate()
    const srcollRef = useRef()
    const [openDelCmt, setOpenDelCmt] = useState(false)
    const noAvatar = process.env.REACT_APP_PUBLIC_FOLDER + "no_avatar1.jpg" 
    const [user ,setUser] = useState([])
    useEffect(()=>{
        const fecthUser = async()=>{
            try{
                const res = await axiosInstance.get(`/user/find/${comment.userId}`)
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
            await axiosInstance.delete(`/comment/${comment._id}/delete`)
              
            alert('Comment deleted successfully!!')
            window.location.reload(true);
            navigate('/')   
            
           } catch (error) {
            alert("Opps!! You just deleted your comment. ")
            setOpenDelCmt(false)
           }
        }
        fetchDelCmt()
    }
    return (
        <>
        <div className="comment-container">
            <div className="comment-wapper">
                <div className="comment-items">
                   <Link to={`/profile/${comment.userId}`} style={{textDecoration:'none'}} > <img src={user.userImg || noAvatar} alt={user.userImg} className="comment-user-img" /></Link>
                    <div className="comment" ref={srcollRef} >
                        <p className="comment-text" >
                            {comment.comment}
                        </p>
                        <span className="comment-name">
                        <Link to={`/profile/${comment.userId}`} style={{textDecoration:'none'}} > <span>{user.username}</span> </Link>  
                            <span className="time">{format(comment.createdAt)}</span>
                            <button className="btn" onClick={()=>setOpenDelCmt(!openDelCmt)} >
                                <MoreHorizIcon fontSize="large"/>
                                </button>
                            <div className="option"> 
                               {openDelCmt && <button onClick={handleDelCmt}>Delete</button>}
                            </div>
                        </span>
                       

                        
                    </div>


                </div>
               


            </div>
            
            
        </div>
        </>
     );
}

export default Comment;
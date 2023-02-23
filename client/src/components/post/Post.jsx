import "./post.scss"
import { format } from 'timeago.js';
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { getStorage, ref ,deleteObject } from "firebase/storage";



import CloseIcon from '@mui/icons-material/Close';
import DragIndicatorIcon from '@mui/icons-material/DragIndicator';
import Comments from "../comments/Comments";


function Post({post}) {
 
    const navigate = useNavigate()
    ////// user ///////////
    const noAvatar = process.env.REACT_APP_PUBLIC_FOLDER + "no_avatar1.jpg" 
    const [user, setUser] = useState([])
    
    useEffect(()=>{
        const fecthUser = async()=>{
            try{
                const res = await axios.get(`/user/find/${post.userId}`)
                setUser(res.data)
            }
            catch(err){
                console.log(err.message);
            }
        }
        fecthUser()

    },[post.userId])
    ////////////////////////
    /////////Post///////////
    //open menu post 
    
    const [postDetele, setPostDetele ] = useState('')
    const [openMenuPost, setOpenMenuPost] = useState(false)
    const handleDelete = ()=>{
        const fectchDelete = async()=>{
            try {
                const res = await axios.delete(`/post/delete/${post._id}`)
                handleDeleteImgFormFirebase(post?.imgPost)
                setPostDetele(alert("Post deleted successfully!!"))
                window.location.reload(true);
            } catch (error) {
                setOpenMenuPost(false);
                setPostDetele(alert("Opps! You just deleted only your post"))

            }
        }
        fectchDelete()
        
    }
    const handleDeleteImgFormFirebase = (img)=>{
           ///imgfile
        const storage = getStorage()
        const httpsReference = ref(storage,img)
        const desertRef = ref(storage, httpsReference);
        deleteObject(desertRef)
        .then(() => {
            console.log("Img deleted successfully")
          }).catch((error) => {
            console.log("Error", error)
          });


    }
    ////////////////////////
    return ( 
        <div className="post-container">
            <div className="post-wapper">
                <div className="post-items">
                    <div className="user-info">
                        <div className="user">
                        <Link to={`profile/${user._id}`}> <img className="user-img" src={user.userImg || noAvatar} alt="" /></Link>
                            <div className="name">
                                <Link to={`profile/${user._id}`} style={{textDecoration:"none"}}><span>{user.username}</span></Link>
                                <div className="time">{format(post.createdAt)}</div>
                            </div>
                        </div>
                        <div className="option">
                           
                           <button 
                            onClick={()=>setOpenMenuPost(!openMenuPost)}
                            // onBlur ={()=>setOpenMenuPost(false)}
                            
                            >
                               {openMenuPost ? <CloseIcon/> :<DragIndicatorIcon fontSize="large"/>}
                             </button>
                           { openMenuPost &&
                           <div className="option-menu">
                               <span onClick={handleDelete} >Delete </span>
                                <span>Edit</span>
                                <span>Report</span>
                            </div>}
                        </div>
                    </div>
                    <div className="line"></div>
                    <span className="desc">{post?.desc}
                    </span>
                    <div className="post-img">
                        {post.imgPost ? <img src={post.imgPost} alt={post.imgPost} /> : <></>}
                    </div>
                    <div className="post-info">
                      <span className="like-count">{post.likes} like</span>
                      <span className="comment-count">14 comments</span>
                      <span className="share-count">3 share</span>

                    </div>
                    <div className="line"></div>
                    <div className="post-action">
                        <div className="action-btn">
                            <button className="likeBtn">
                                <img src="https://cdn-icons-png.flaticon.com/512/8359/8359645.png" alt="" />
                                <span>Like</span>
                            </button>
                            <button className="likeBtn">
                                <img src="https://cdn-icons-png.flaticon.com/512/4470/4470922.png" alt="" />
                                <span>Comment</span>
                            </button>
                            <button className="likeBtn">
                                <img src="https://cdn-icons-png.flaticon.com/512/2936/2936774.png" alt="" />
                                <span>Share</span>
                            </button>
                        </div>
                    </div>
                    <div className="line"></div>
                    <Comments/>


                </div>
            </div>
        </div>
     );
}

export default Post;
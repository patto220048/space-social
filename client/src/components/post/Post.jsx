import "./post.scss"
import { format } from 'timeago.js';
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";


import CloseIcon from '@mui/icons-material/Close';
import DragIndicatorIcon from '@mui/icons-material/DragIndicator';
import Comments from "../comments/Comments";


function Post({post}) {
    const noAvatar = process.env.REACT_APP_PUBLIC_FOLDER + "no_avatar1.jpg" 
    
    const [user, setUser] = useState([])

    // console.log(user)
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
                            <CloseIcon/>
                            <DragIndicatorIcon/>

                        </div>
                    </div>
                    <div className="line"></div>
                    <span className="desc">{post.desc}
                    </span>
                    <div className="post-img">
                        {post.imgPost ? <img src={post.imgPost} alt="" /> : <></>}
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
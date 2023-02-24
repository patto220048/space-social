
import "./comment.scss"
import axios from "axios"
import { useEffect, useState } from "react"



function Comment({comment}) {

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
    return (
        <div className="comment-container">
            <div className="comment-wapper">
                <div className="comment-items">
                    <img src={user.userImg || noAvatar} alt={user.userImg} className="comment-user-img" />
                    <div className="comment">
                        <span className="comment-name">
                           {user.username}
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
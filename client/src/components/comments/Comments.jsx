
import "./comments.scss"
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import axios from "axios";



import Comment from "../comment/Comment";
import ReactLoading from 'react-loading';


function Comments({post}) {
    const  {currentUser} = useSelector((state) => state.user)
    const noAvatar = process.env.REACT_APP_PUBLIC_FOLDER + "no_avatar1.jpg" 
    const [comments, setComments] = useState([])
    const [desc , setDesc] = useState('')
    const [isloading, setIsLoading] = useState(true)
    console.log(isloading)
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
            try {
                const res = await axios.post(`comment/create`,{
                    postId : post._id,
                    comment: desc
                })
            
            } catch (error) {
                console.log(error.message)

            }
        }
        createComment()

        setDesc('')

    }

    return ( 
        <div className="comments-container">
            <div className="comments-wapper">
                <div className="comments-item">
                    <img className="comments-img" src={currentUser.userImg || noAvatar} alt={currentUser.userImg} />
                    <input 
                        className="comments-input"
                        type="text" 
                        placeholder="comments"
                      
                        onChange={(e)=>setDesc(e.target.value)}
                    />
                 
                   {!desc ? <button type="submit" disabled className="comments-button" onClick={handleCreateComment}>
                        Comment
                    </button>:
                   <button type="submit" className="comments-button" onClick={handleCreateComment}>
                        Comment
                    </button>
                    }
                  

                </div>
                
            </div>
            <div className="comment">
                
                { 
                comments.map((comment,index)=>(

                    <Comment comment={comment} key={index}/>
                ))}

              

            </div>
                
                
        
        </div>
        

    
        

     );
}

export default Comments;
import "./feed.scss"

import Share from "../share/Share";
import Post from "../post/Post";
import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { postFail, postStart, postSuccess } from "../../redux/postSlice";
import Upload from "../upload/Upload";



function Feed({type,paramId,socket,setOpenUpload}) {

    const  {currentPost} = useSelector((state) => state.post)
    const   dispatch = useDispatch()

    const [posts, setPosts] = useState([])
    const [activeTab, setActiveTab] = useState()

    const btnList = [{
        name: "#all",
        link : '/random' 
    },{
        name: "#newpost",
        link : '/newpost' 
    },{
        name: "#followed",
        link : '/followed'
    }]
    
    useEffect(()=>{
      const fecthPost = async() => {
        dispatch(postStart())
          try {
              const res = paramId 
              ? await axios.get(`/post/profile/${paramId}`)
              : await axios.get(`/post/${type}`)
              setPosts(res.data)
              dispatch(postSuccess(res.data))
          } catch (err) {
              console.log(err.message)
              dispatch(postFail(err.message))
       
          }
         
      } 
      fecthPost()

  },[paramId,type])
  



    return ( 
        <div className="feed-container">
            <div className="feed-wapper">
                <Share setOpenUpload={setOpenUpload}/>
             {type &&  
                <div className="tab-btn ">
                    {btnList.map((list,index)=>(
                    <Link to={list.link} style={{textDecoration:'none'}} key={index}>
                       <button  className={"tab-btn "+ (activeTab === index ? "active": "")} onClick={()=>setActiveTab(index)}>{list.name}</button>    
                    </Link>
                    ))}
                </div>}
                {posts?.length === 0
                    ?
                    <div className="notFound">
                        <p>Not found post</p>

                    </div>
                    :
                    posts.map((post,index)=>(
                        <Post post={post} key={index} socket={socket}/>
                    ))
                    
                }
            </div>
        </div>
    );
}

export default Feed;
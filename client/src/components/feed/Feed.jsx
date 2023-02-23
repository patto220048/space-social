import "./feed.scss"

import Share from "../share/Share";
import Post from "../post/Post";
import { useEffect, useState } from "react";
import axios from "axios";

function Feed({type,paramId ,setOpenUpload}) {
    
    const [posts, setPosts] = useState([])
    console.log(posts)

    useEffect(()=>{
      const fecthPost = async() => {
          try {
              const res = paramId 
              ? await axios.get(`/post/profile/${paramId}`)
              : await axios.get(`/post/${type}`)
              setPosts(res.data)
              
          } catch (err) {
              console.log(err.message)
          }
         
      }
      fecthPost()

  },[paramId])
  



    return ( 
        <div className="feed-container">
            <div className="feed-wapper">
                <Share setOpenUpload={setOpenUpload}/>
                {posts=== null ? 
                <p>not found</p>
                :
                posts.map((post,index)=>(
                    <Post post={post} key={index}/>

                ))
            }
            </div>
        </div>
    );
}

export default Feed;
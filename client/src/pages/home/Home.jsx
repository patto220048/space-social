import "./home.scss"
import { useEffect, useState } from "react";

import axios from "axios"

import Share from "../../components/share/Share";
import Post from "../../components/post/Post";
import Upload from "../../components/upload/Upload";
import Feed from "../../components/feed/Feed";

function Home({openUpload,setOpenUpload}) {
    
   
    
      return (  
        <div className="container-home">
            <Upload openUpload={openUpload} setOpenUpload={setOpenUpload} />
            <div className="wapper-home">
                <Feed/>
                {/* <Share openUpload={openUpload} setOpenUpload={setOpenUpload}/>
                {posts.map((post,index)=>(
                    <Post post={post} key={index}/>

                ))}
             */}

            </div>
            
        </div>
      );
  
  }
  
  export default Home;
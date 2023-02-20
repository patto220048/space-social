import "./home.scss"
import Share from "../../components/share/Share";
import Post from "../../components/post/Post";
import Upload from "../../components/upload/Upload";
import { useState } from "react";

function Home({openUpload,setOpenUpload}) {
    
      return (  
        <div className="container-home">
            <Upload openUpload={openUpload} setOpenUpload={setOpenUpload} />
            <div className="wapper-home">
                <Share openUpload={openUpload} setOpenUpload={setOpenUpload}/>
                <Post/>
                <Post/>
                <Post/>
                <Post/>
                <Post/>
                <Post/>
                <Post/>
                <Post/>
                <Post/>
                <Post/>
                <Post/>
                <Post/>
                <Post/>
                <Post/>
                <Post/>
                <Post/>
                <Post/>
                <Post/>
            

            </div>
            
        </div>
      );
  
  }
  
  export default Home;
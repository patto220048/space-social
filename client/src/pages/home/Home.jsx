import "./home.scss"
import { useEffect, useState } from "react";

import axios from "axios"

import Share from "../../components/share/Share";
import Post from "../../components/post/Post";
import Upload from "../../components/upload/Upload";
import Feed from "../../components/feed/Feed";

function Home({type,openUpload,setOpenUpload}) {

      return (  
        <>
            <div className="container-home">
                <Upload openUpload={openUpload} setOpenUpload={setOpenUpload}/>
                <div className="wapper-home">
                    <Feed type = {type} openUpload={openUpload} setOpenUpload={setOpenUpload} />
                </div>
                
            </div>
        </>
      );
  
  }
  
  export default Home;
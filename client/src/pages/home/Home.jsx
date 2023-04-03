import "./home.scss"
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import axios from "axios"

import Upload from "../../components/upload/Upload";
import Feed from "../../components/feed/Feed";
import Rightbar from "../../layout/rightbar/Rightbar";
import WarningPost from "../../components/warningPost/WarningPost";
import EditPost from "../../components/editPost/EditPost";
import Share from "../../components/share/Share";


function Home({type,socket,openRightbar}) {
    
        
    const [openMenuPost, setOpenMenuPost] = useState(false)
    const [openUpload, setOpenUpload] = useState(false)

      return (  
        <>  
     
            <div className="container-home">
                <Upload openUpload={openUpload} setOpenUpload={setOpenUpload}/>
                <div className="wapper-home">
                    <Share setOpenUpload={setOpenUpload} />
                    <Feed 
                    type = {type} 
                    setOpenUpload={setOpenUpload} 
                    socket ={socket} 
                    openMenuPost={openMenuPost}
                    setOpenMenuPost={setOpenMenuPost}
                
                    />
                </div>
                
            </div>
            <Rightbar openRightbar={openRightbar}/>
        </>
      );
  
  }
  
  export default Home;
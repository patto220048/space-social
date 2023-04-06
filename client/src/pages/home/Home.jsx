import "./home.scss";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import UploadFile from "../../components/upload/UploadFile";
import Feed from "../../components/feed/Feed";
import Rightbar from "../../layout/rightbar/Rightbar";
import Share from "../../components/share/Share";

function Home({type,socket,openRightbar}) {
    
    const [openMenuPost, setOpenMenuPost] = useState(false)
    const [openUpload, setOpenUpload] = useState(false)

      return (  
        <>  
     
            <div className="container-home">
                <UploadFile openUpload={openUpload} setOpenUpload={setOpenUpload}/>
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
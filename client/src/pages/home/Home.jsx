import "./home.scss"
import { useEffect, useState } from "react";

import axios from "axios"

import Upload from "../../components/upload/Upload";
import Feed from "../../components/feed/Feed";

function Home({type,socket}) {
    const [openUpload, setOpenUpload] = useState(false)
      return (  
        <>  
            <div className="container-home">
                <Upload openUpload={openUpload} setOpenUpload={setOpenUpload}/>
                <div className="wapper-home">
                    <Feed type = {type} setOpenUpload={setOpenUpload} socket ={socket}/>
                </div>
                
            </div>
        </>
      );
  
  }
  
  export default Home;
import "./share.scss"
import CloseIcon from '@mui/icons-material/Close';
import { useSelector } from "react-redux";

import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import LiveTvIcon from '@mui/icons-material/LiveTv';
import MovieIcon from '@mui/icons-material/Movie';
function Share({setOpenUpload}) {
    const  {currentUser} = useSelector((state) => state.user)   
    const noAvatar = process.env.REACT_APP_PUBLIC_FOLDER + "no_avatar1.jpg" 
 

    return (    
        <>
            <div className="share-container">
                <div className="warpper-share">
                    <div className="share-items">
                        <img src={currentUser.userImg || noAvatar} alt="avatar" />
                        <button className="input-share" onClick={()=>setOpenUpload(true)}>What do you think about day ?</button>
                    
                    </div>
                    {/* <div className="line"></div> */}
                    <div className="share-option">
                        <div className="upload">
                                <button className="upload-btn" onClick={()=>setOpenUpload(true)}>
                                    <CloudUploadIcon/>
                                    {/* <img src="https://cdn-icons-png.flaticon.com/512/4144/4144765.png" alt="" /> */}
                                    <span>UPLOAD</span>
                                </button>
                                <button className="upload-btn">
                                    {/* <img src="https://cdn-icons-png.flaticon.com/512/9582/9582368.png" alt="" /> */}
                                    <LiveTvIcon/>
                                    <span>LIVE</span>

                                </button>
                                <button className="upload-btn">
                                    {/* <img src="https://cdn-icons-png.flaticon.com/512/9582/9582374.png" alt="" /> */}
                                    <MovieIcon/>
                                    <span>VIDEO</span>

                                </button>
                        </div>
                        {/* <div className="upload-items">
                            <div className="upload-wapper">
                                <div className="close">
                                <button className="close-btn">
                                        <CloseIcon/>
                                </button>
                                </div>
                                <span className="create-title">Create Post</span>
                                <span className="line"></span>
                            </div>
                        </div> */}


                    
                            
                        

                    </div>
                   
                </div>
            </div>
            <div className="upload-items">
                        

                    </div>
        </>


        
     );
}

export default Share;
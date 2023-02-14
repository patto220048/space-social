import "./share.scss"
import CloseIcon from '@mui/icons-material/Close';




function Share() {




    return (
        <>
            <div className="share-container">
                <div className="warpper-share">
                    <div className="share-items">
                        <img src="https://images.unsplash.com/photo-1675372339768-14ed0300cd37?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwzMXx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=60" alt="" />
                        <input className="input-share" type="text" placeholder="What do you think about day ?" />
                    
                    </div>
                    {/* <div className="line"></div> */}
                    <div className="share-option">
                    <div className="upload">
                            <button className="upload-btn">
                                <img src="https://cdn-icons-png.flaticon.com/512/4144/4144765.png" alt="" />
                                <span>UPLOAD</span>
                            </button>
                            <button className="upload-btn">
                                <img src="https://cdn-icons-png.flaticon.com/512/9582/9582368.png" alt="" />
                                <span>LIVE</span>

                            </button>
                            <button className="upload-btn">
                                <img src="https://cdn-icons-png.flaticon.com/512/9582/9582374.png" alt="" />
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
        </>


        
     );
}

export default Share;
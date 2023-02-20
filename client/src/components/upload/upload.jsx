import "./upload.scss"
import CloseIcon from '@mui/icons-material/Close';


function Upload({openUpload,setOpenUpload}) {
    
    return ( 
        <>
            {openUpload &&
            <div className="upload-tiem">
                <div className="upload-wapper">
                    <div className="close">
                        <button className="close-btn" onClick={()=>setOpenUpload(false)}> 
                            <CloseIcon/>
                        </button>
                    </div>
                    <div className="items">
                        <h1 className="create-title">Create Post</h1>
                        <span className="line"></span>
                        <div className="input-upload">
                            <textarea name="" id=""  placeholder="What do you thinking ?"></textarea>
                            <button className="input-btn">
                                <input  className='input-file' type="file" accept="image/*" />
                            </button>
                        </div>
                    </div>
                    <button type='submit' className="sub-btn">POST</button>
                </div>

            </div>}
        </>
     );
}

export default Upload;
import './warningPost.scss'
import CloseIcon from '@mui/icons-material/Close';

function WarningPost( {setOpenWarningPost,handleDelete}) {

    return (  
        <div className="warning-post" >
            <div className="warning-post-items">
                <div className="head-items-post">
                    <span>WARNING</span>
                    <div className="icon" onClick={()=>setOpenWarningPost(false)}>
                        <CloseIcon/>
                    </div>
                </div>
                <p>You sure delete this post</p>
                <div className="body-items">
                    <button onClick={handleDelete}>Yes</button>
                    <button onClick={()=>setOpenWarningPost(false)}>No</button>
                </div>
            </div>
        </div>
    );
}

export default WarningPost;
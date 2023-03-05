import './other.scss'
import CloseIcon from '@mui/icons-material/Close';


function Other() {
    return ( 
        <div className="upload-avt">
        <div className="upload-avt-wapper">
            <div className="close">
                <button className="close-btn" > 
                    <CloseIcon/>
                </button>
            </div>
            <div className="items">
                <h1 className="create-title">UPLOAD AVATAR</h1>
                <span className="line"></span>
            
            </div>
           
            
            <button type='submit' className="sub-btn">POST</button>
          
          
        </div>

    </div>  
     );
}

export default Other;
import './warningSetting.scss'
import CloseIcon from '@mui/icons-material/Close';

function WarningSetting( {setOpenWarning,handleDelAcc}) {


    return (  
        <div className="warning" >
            <div className="warning-items">
                <div className="head-items">
                    <span>WARNING</span>
                    <div className="icon" onClick={()=>setOpenWarning(false)}>
                        <CloseIcon/>
                    </div>
                </div>
                <p>You sure delete your account</p>
                <div className="body-items">
                    <button onClick={handleDelAcc}>Yes</button>
                    <button onClick={()=>setOpenWarning(false)}>No</button>
                </div>
            </div>
        </div>
    );
}

export default WarningSetting;
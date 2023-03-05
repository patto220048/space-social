import './uploadavt.scss'
import { useEffect, useState } from 'react';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import app from "../../firebase/firebase";
import { useDispatch, useSelector } from "react-redux";

import CloseIcon from '@mui/icons-material/Close';
import axios from 'axios';
import { loginSuccess } from '../../redux/userSlice';
function UploadAvt({openUploadAvt,setOpenUploadAvt}) {
    //current user
    const  {currentUser} = useSelector((state) => state.user)
    const dispatch = useDispatch()

    
    // default avatar an bg
    const noAvatar = process.env.REACT_APP_PUBLIC_FOLDER + "no_avatar1.jpg" 
    const noBg = process.env.REACT_APP_PUBLIC_FOLDER + "no_bg2.png" 

    //upload avatar and bg
    const [inputs ,setIputs] = useState({})
    const [avatar, setAvatar] = useState(undefined)
    const [background, setBackground] = useState(undefined)

    const uploadFile = (file, type ) =>{
        const storage = getStorage(app);
        const fileName = new Date().getTime() + file.name
        const storageRef = ref(storage, fileName);
        const uploadTask = uploadBytesResumable(storageRef, file);
        uploadTask.on('state_changed',
            (snapshot) => {
                // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                // type === 'imgPost' && setImgPercent(Math.round(progress))
                switch (snapshot.state) {
                case 'paused':
                    console.log('Upload is paused');
                    break;
                case 'running':
                    console.log(`is running`);

                    break;
                default:

                    break;
                }
            },
            //handle error
            (error) => {console.log('Upload error: ' + error)},
            () => {
                // Upload completed successfully, now we can get the download URL
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    setIputs((pre)=>{
                        return {...pre, [type]:downloadURL}
                    })
                });
              }

            )
    }

    useEffect(()=>{
        avatar && uploadFile(avatar,'userImg')
    },[avatar])

    useEffect(()=>{
        background && uploadFile(background,'userCoverImg')
    },[background])
    

    const handlePost = (e) =>{
        const fectchPost = async() => {
            try {
                const res = await axios.put(`/user/edit/${currentUser._id}`,{...inputs})
                dispatch(loginSuccess(res.data))
            } catch (error) {
                console.log('api error: ' + error)
            }
        }
        fectchPost()
        setOpenUploadAvt(false)
    }
    

    const handleClose = () =>{
        setOpenUploadAvt(false)
        setIputs({})
        setAvatar(undefined)
        setBackground(undefined)

    }

    return ( 
        <>
       
        {openUploadAvt &&
        <div className="upload-avt">
            <div className="upload-avt-wapper">
                <div className="close">
                    <button className="close-btn" onClick={handleClose} > 
                        <CloseIcon/>
                    </button>
                </div>
                <div className="items">
                    <h1 className="title">UPLOAD AVATAR</h1>
                    <span className="line"></span>
                    <div className="wapper-items">
                        <div className="background">
                            <img className="background-img" src={inputs.userCoverImg ||noBg} alt="" />
                        </div>
                        <div className="avatar">
                            <img className="avatar-img" src={inputs.userImg || noAvatar} alt="" />
                        </div>
                        <div className="input">
                                <div className="input-avt">
                                    <div className='name'>Avatar :</div>
                                    <input type="file" name='fileAvt' id="fileAvt" onChange={(e)=>setAvatar(e.target.files[0])}  accept="image/*"/>
                                    {avatar ?  <span>{avatar.name}</span> :<label htmlFor="fileAvt">Choose a file . . </label>}
                                </div>
                                <div className="input-avt">
                                <div className='name' >Backgound :</div>
                                    <input type="file" name='fileBg' id="fileBg" onChange={(e)=>setBackground(e.target.files[0])}  accept="image/*"/>
                                    {background ? <span>{background.name}</span>:<label htmlFor="fileBg">Choose a file . . </label>}

                                </div>
                            
                        </div>

                    </div>
                
                </div>
            
                
                <button type='submit' className="sub-btn" onClick={handlePost}>OKAY</button>
            
            
            </div>

        </div>  
        }
        </>
     );
}

export default UploadAvt;
import "./upload.scss"
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import app from "../../firebase/firebase";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";


import ReactLoading from 'react-loading';
import CloseIcon from '@mui/icons-material/Close';
function Upload({openUpload, setOpenUpload}) {
    //
    const navigate = useNavigate()
    //
    const noAvatar = process.env.REACT_APP_PUBLIC_FOLDER + "no_avatar1.jpg" 
    const [img, setImg] = useState(undefined)
    const [inputs ,setIputs] = useState({})
    const [imgPercent, setImgPercent] = useState(0)
    
  
    //get input 
    const handleChange= (e) => {
        setIputs((pre)=>{
            return {...pre, [e.target.name] : e.target.value}
        })
    }
    //setup firebase
    const uploadFile = (file, type ) =>{
        const storage = getStorage(app);
        const fileName = new Date().getTime() + file.name
        const storageRef = ref(storage, fileName);
        const uploadTask = uploadBytesResumable(storageRef, file);
        uploadTask.on('state_changed',
            (snapshot) => {
                // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                type === 'imgPost' && setImgPercent(Math.round(progress))
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

    //upload file
    useEffect(()=>{
        img && uploadFile(img,'imgPost')
    },[img])

    // handle post

    const handlePost = (e) =>{
        e.preventDefault()
        const fectchPost = async() => {
            try {
                const res = await axios.post('/post/create',{...inputs})
                navigate('/newpost')
            } catch (error) {
                console.log('api error: ' + error)
            }
        }
        fectchPost()
        setOpenUpload(false)
    }

    
    

    return ( 
        <>
            { openUpload &&
            <div className="upload-tiem">
               
                <div className="upload-wapper">
                   
                    <div className="close">
                        <button className="close-btn" onClick={()=>setOpenUpload(false)}> 
                            <CloseIcon/>
                        </button>
                    </div>

                  
                    {/* <div className="loading">
                        <div className="loading-item">
                            <ReactLoading type={"cylon"}/>;
                        </div>
                    </div>
                    */}
                   
                   
                    <div className="items">
                        <h1 className="create-title">Create Post</h1>
                        <span className="line"></span>
                        <div className="input-upload">
                            <textarea 
                            required
                            name="desc" 
                            id=""  
                            placeholder="What do you thinking ?" onChange={handleChange}></textarea>
                            {inputs.imgPost 
                            ? 
                            <img src={inputs.imgPost} alt="" className="s-img" />
                            : <button className="input-btn">
                                <input 
                                className='input-file' 
                                type="file" 
                                accept="image/*"
                                onChange={(e)=>setImg(e.target.files[0])}
                                  />
                            </button>}
                            
                        </div>
                    </div>
                    {inputs.desc
                    ? 
                    <button type='submit' className="sub-btn" onClick={handlePost}>POST</button>
                    : 
                    <button type='submit' disabled className="sub-btn" onClick={handlePost}>POST</button>}
                </div>

            </div>}
        </>
     );
}

export default Upload;
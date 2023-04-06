import "./uploadFile.scss"
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import app from "../../firebase/firebase";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
    
import CloseIcon from '@mui/icons-material/Close';
import { useDispatch } from "react-redux";
import { postAdd } from "../../redux/postSlice";


import PanoramaIcon from '@mui/icons-material/Panorama';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';

import IsLoading from "../loading/IsLoading";

function Upload({openUpload, setOpenUpload,avatar}) {
    const axiosInstance = axios.create({
        baseURL : process.env.REACT_APP_API_URL,
        withCredentials: true,
        headers: {
        "Content-type": "application/json",
        },
    })
    //
    const navigate = useNavigate()
    //
    const dispatch = useDispatch()

    const noAvatar = process.env.REACT_APP_PUBLIC_FOLDER + "no_avatar1.jpg" 
    const [img, setImg] = useState(undefined)
    const [inputs ,setInputs] = useState({})
    const [imgPercent, setImgPercent] = useState(0)
    const [isLoading, setIsLoading] = useState(false)
    //open menu upload img/video
    const [openImgAndVideo , setOpenImgAndVideo] = useState(false)
    //get input 
    const handleChange= (e) => {
        setInputs((pre)=>{
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
                    setIsLoading(true)
                    break;
                default:
                    break;
                }
            },
            //handle error
            (error) => {console.log('Upload error: ' + error)},
            () => {
                setIsLoading(false);
                // Upload completed successfully, now we can get the download URL
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    setInputs((pre)=>{
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
            setIsLoading(false)
            try {
                const res = await axiosInstance.post('/post/create',{...inputs})
                navigate('/newpost')
                dispatch(postAdd(res.data))
                setInputs({})
                setImg(undefined)
                setIsLoading(true)
                window.location.reload()

            } catch (error) {
                console.log('api error: ' + error)
            }
        }   
        fectchPost()
        setOpenUpload(false)
        setIsLoading(false)
        

    }
    
    

    return ( 
        <>
            { openUpload &&
            <div className="upload-tiem">
               
                <div className="upload-wapper">
                   
                    

                {  isLoading &&
                    <IsLoading/>
                   }
                   
                   
                    <div className="items">
                        <div className="close">
                            <button className="close-btn" onClick={()=>setOpenUpload(false)}> 
                                <CloseIcon/>
                            </button>
                        </div>
                        <h1 className="create-title">Create Post</h1>
                        <span className="line"></span>
                        <div className="input-upload">
                            <textarea 
                            required
                            name="desc" 
                            id=""  
                            placeholder="What do you thinking ?" onChange={handleChange}>
                            </textarea>
                       
                            <div className="btn-menu">
                                <button className="img-video" onClick={()=>setOpenImgAndVideo(!openImgAndVideo)}>
                                    <PanoramaIcon /> 
                                    <span>Img/Video</span>
                                </button>
                                <button className="img-video" onClick={() =>alert("This function is not available yet !")}>
                                    <LocalOfferIcon style={{color:'rgb(30, 30, 205)'}}/>
                                     <span>Tag</span>
                                </button>
                               
                            </div>
                          

                        { openImgAndVideo ?
                         <>
                            {inputs.imgPost 
                            ? 
                            <img src={inputs.imgPost} alt="" className="s-img" />
                            : <button className="input-btn">
                                <input 
                                id="file"
                                className='input-file' 
                                type="file" 
                                accept="image/*"
                                onChange={(e)=>setImg(e.target.files[0])}
                                />
                            </button>
                            }
                            </>
                            :
                            <></>
                            }
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
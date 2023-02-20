import { useState } from 'react';

import EmailIcon from '@mui/icons-material/Email';
import HouseIcon from '@mui/icons-material/House';
import AccessTimeFilledIcon from '@mui/icons-material/AccessTimeFilled';



import Navbar from '../../layout/navbar/Navbar';
import Sidebar from '../../layout/sidebar/Sidebar';
import Home from '../home/Home';
import Upload from "../../components/upload/Upload";


import AddIcon from '@mui/icons-material/Add';
import './profile.scss'
import { useSelector } from 'react-redux';
import Share from '../../components/share/Share';
import Post from '../../components/post/Post';


function Profile({openUpload,setOpenUpload}) {
    const  {currentUser} = useSelector((state) => state.user)

    console.log(currentUser)
    const noAvatar = process.env.REACT_APP_PUBLIC_FOLDER + "no_avatar1.jpg" 
    const noBg = process.env.REACT_APP_PUBLIC_FOLDER + "no_bg2.png" 

    const [openEditDesc,setOpenEditDesc] = useState(false)

    return ( 
        <>
            <div className="profile-container">
                <Upload openUpload={openUpload} setOpenUpload={setOpenUpload}/>
                <div className="profile-warpper">
                    <div className="profile-item">
                        <div className="profile-top">
                            <div className="background">
                                <img className='background-img' src={ currentUser.userCoverImg || noBg} alt={currentUser.userCoverImg} />
                                <button><AddIcon fontSize='large'  className='add-icon'/></button>
                            </div>
                            {/* <div className="btn-fl">
                                <button className='follow1'>Follow</button>
                                <button className='follow2'>Follow</button>  
                            </div> */}
                            <div className="avatar">
                                <img className='avatar-img' src={ currentUser.userImg ||noAvatar} alt={currentUser.userImg} />
                                <button className='avatar-add-icon'>
                                    <AddIcon fontSize='large' className='add-icon'/>
                                </button>
                            
                            </div>
                            <h1 className="name-user">{currentUser.username}</h1>
                            
                            <div className="profile-mid">
                                <p className='following-count'><span>{currentUser.followUser}</span>following</p>
                                <p className='follower-count'><span>{currentUser.follower.lenght} </span>follower</p>
                                <p className='post-count'><span>1 </span>post</p>

                            </div>
                        </div>
                        <div className="profile-bottom">
                            <div className="left">
                                <div className="introduce-item">
                                    <h1 className='introduce'>Introduce</h1>
                                    <div className="desc">
                                        <p className='desc-text' >{currentUser.decs}</p>
                                        { openEditDesc ? 
                                        <div className="edit">
                                            <textarea name="" id="" cols="30" rows="4"></textarea>
                                            <div className="edit-desc">
                                                <button className='cancel-btn' onClick={()=>setOpenEditDesc(!openEditDesc)}> Cancel</button>
                                                <button className ='update-btn'> Update</button>
                                            </div>

                                        </div>
                                        :
                                        <button className ='edit-btn' onClick={()=>setOpenEditDesc(!openEditDesc)}> Edit</button>
                                        }                                   
                                    </div>              
                
                                </div>
                                <div className="info">
                                    <h1 className='detail'>Details</h1>

                                    <div className="info-item">
                                        <div className="info-icon">
                                            <span><EmailIcon/></span>
                                            <p>{currentUser.email}</p>
                                        </div>
                                        <div className="info-icon">
                                            <span><HouseIcon/></span>
                                            <p>{currentUser.region}</p>
                                        </div>
                                        <div className="info-icon">
                                            <span><AccessTimeFilledIcon/></span>
                                            <p>Join {currentUser.updatedAt}</p>
                                        </div>
                                        
                                        
                                        <button className="info-btn">
                                            Edit
                                        </button>
                                        
                                    </div>
                                
                                    {/* <div className="edit-info">

                                        <input type="text" placeholder='email'/>
                                        <input type="text"  placeholder='from'/>
                                    
                                        <div className="btn-info-edit">
                                            <button className="cancel-btn">
                                                Cancel
                                            </button>
                                            <button className="update-btn">
                                                Update
                                            </button>

                                        </div>
                                    </div> */}
                                    
                                </div>
                                
                            </div>
                            <div className="right">
                            <Share openUpload={openUpload} setOpenUpload={setOpenUpload}/>
                            <Post/>
                            <Post/>
                            <Post/>
                            <Post/>
                            <Post/>
                            <Post/>
                            <Post/>
                            
                            </div>

                        
                        </div>

                    
                    
                    
                        
                    </div>
                </div>
            </div>
        </>
     );
}

export default Profile;
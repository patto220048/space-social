import { useState } from 'react';

import EmailIcon from '@mui/icons-material/Email';
import HouseIcon from '@mui/icons-material/House';
import AccessTimeFilledIcon from '@mui/icons-material/AccessTimeFilled';


import Post from '../../components/post/Post';
import Navbar from '../../layout/navbar/Navbar';
import Sidebar from '../../layout/sidebar/Sidebar';
import Contents from '../../layout/contents/Contents';

import AddIcon from '@mui/icons-material/Add';
import './profile.scss'


function Profile({openSearch,setOpenSearch}) {
    const [openEditDesc,setOpenEditDesc] = useState(false)

    return ( 
        <>
         <Navbar openSearch={openSearch} setOpenSearch={setOpenSearch}/>
        <div className="profile-container">
            <Sidebar/>
            <div className="profile-warpper">
                <div className="profile-item">
                    <div className="profile-top">
                        <div className="background">
                            <img className='background-img' src="https://images.unsplash.com/photo-1676113462035-e4d56ce608d1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwzNnx8fGVufDB8fHx8&auto=format&fit=crop&w=2000&q=60" alt="" />
                            <button><AddIcon fontSize='large'  className='add-icon'/></button>
                        </div>
                        {/* <div className="btn-fl">
                            <button className='follow1'>Follow</button>
                            <button className='follow2'>Follow</button>  
                        </div> */}
                        <div className="avatar">
                            <img className='avatar-img' src="https://images.unsplash.com/photo-1675621929929-a8a74c6b795e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwzMXx8fGVufDB8fHx8&auto=format&fit=crop&w=2000&q=60" alt="" />
                            <button className='avatar-add-icon'>
                                <AddIcon fontSize='large' className='add-icon'/>
                            </button>
                           
                        </div>
                        <h1 className="name-user">DINH HUU PHAT</h1>
                        
                        <div className="profile-mid">
                            <p className='post-count'><span>2 </span>following</p>
                            <p className='follow-count'><span>1000 </span>follower</p>
                            <p className='friend-count'><span>1 </span>post</p>

                        </div>
                    </div>
                    <div className="profile-bottom">
                        <div className="left">
                            <div className="introduce-item">
                                <h1 className='introduce'>Introduce</h1>
                                <div className="desc">
                                    <p className='desc-text' >hello guys</p>
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
                                        <p>dinhuuphat4@gmail.com</p>
                                    </div>
                                    <div className="info-icon">
                                        <span><HouseIcon/></span>
                                        <p>VIET NAM</p>
                                    </div>
                                    <div className="info-icon">
                                        <span><AccessTimeFilledIcon/></span>
                                        <p>Join 17-2-2023</p>
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
                           <Contents/>
                        </div>

                      
                    </div>

                  
                   
                   
                    
                </div>
            </div>
        </div>
        </>
     );
}

export default Profile;
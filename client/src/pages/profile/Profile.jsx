import { useEffect, useState } from 'react';
import './profile.scss'
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import axios from 'axios';
import {follow, loginSuccess, waitting , remove} from "../../redux/userSlice";
import { Link } from 'react-router-dom';

import EmailIcon from '@mui/icons-material/Email';
import HouseIcon from '@mui/icons-material/House';
import AccessTimeFilledIcon from '@mui/icons-material/AccessTimeFilled';
import CheckIcon from '@mui/icons-material/Check';
import Upload from "../../components/upload/Upload"
import AddIcon from '@mui/icons-material/Add';
import Feed from '../../components/feed/Feed';
import DoneIcon from '@mui/icons-material/Done';
import Rightbar from '../../layout/rightbar/Rightbar';
import UploadAvt from '../../components/uploadAvatar/UploadAvt';
import HourglassTopIcon from '@mui/icons-material/HourglassTop';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import CakeIcon from '@mui/icons-material/Cake';
import FriendsProfile from '../../components/friendProfile/FriendsProfile';


function Profile({posts}) {
    const [openUpload, setOpenUpload] = useState(false)
    const [openUploadAvt, setOpenUploadAvt] = useState(false)
    const  {currentUser} = useSelector((state) => state.user)
    const dispatch = useDispatch()
    const paramId = useParams()
    const noAvatar = process.env.REACT_APP_PUBLIC_FOLDER + "no_avatar1.jpg" 
    const noBg = process.env.REACT_APP_PUBLIC_FOLDER + "no_bg2.png" 

    const [descProfile,setDescProfile] = useState('')

    const [openEditDesc,setOpenEditDesc] = useState(false)

    const [user, setUser] = useState({})

    const [openRemove, setOpenRemove] = useState(false)
  
    useEffect(()=>{
        const fecthUser = async()=>{
            
            try{
                const res = await axios.get(`/user/find/${paramId.userId}`)
                setUser(res.data)
            }
            catch(err){
                console.log(err.message);
            }
        }
        fecthUser()

    },[paramId.userId])
    
    const handleFollow = () =>{
        const fecthFollow = async()=>{
           try {
                currentUser.flowing?.includes(paramId.userId)
                ?
                await axios.put(`/user/unfollow/${paramId.userId}`)
                :
                await axios.put(`/user/follow/${paramId.userId}`)
                dispatch(follow(paramId.userId))
           } catch (error) {
               console.log(error.message)
           }
        }
        fecthFollow()
    }
    const handleFriend = () => {
        const fecthFriend = async()=>{
            try {
                 currentUser.waitting?.includes(paramId.userId)
                 ?
                 await axios.put(`/user/unpendding/${paramId.userId}`)
                 
             
                 :await axios.put(`/user/pendding/${paramId.userId}`)
            
                 dispatch(waitting(paramId.userId))

            } catch (error) {
                console.log(error.message)
            }
         }
         fecthFriend()

    }
    const handleUpdateDesc = () =>{
        const fecthUser = async()=>{
            try {  
                const res = await axios.put(`/user/edit/${paramId.userId}`,{
                    descProfile : descProfile
                })
                dispatch(loginSuccess(res.data))
                setOpenEditDesc(false)
                setDescProfile('')
            } catch (err) {
                console.log(err.message)
                
            }
        } 
        fecthUser()
    }

    const handleRemove = () =>{
        const fecthRemove = async()=>{
            try {  
                 await axios.put(`/user/remove/${paramId.userId}`)
                dispatch(remove(paramId.userId))
            } catch (err) {
                console.log(err.message)

            }
        }
        fecthRemove()

    }

    return ( 
        <>
            <div className="profile-container">
                <Upload openUpload={openUpload} setOpenUpload={setOpenUpload} />
                <UploadAvt openUploadAvt={openUploadAvt} setOpenUploadAvt={setOpenUploadAvt}/>
                <div className="profile-warpper">
                    <div className="profile-item">
                        <div className="profile-top">   
                            <div className="background">
                                <img className='background-img' src={user.userCoverImg || noBg} alt={user.userCoverImg} />
                                <button onClick={()=>setOpenUploadAvt(true)}>
                                    <AddIcon fontSize='large'className='add-icon' />
                                </button>
                            </div>
                            <div className="btn-fl">
                                {currentUser._id === paramId.userId 
                                ?
                                <></>
                                :
                                <button className='follow1' onClick={handleFriend}> 
                                    {currentUser.waitting?.includes(paramId.userId)
                                     ?
                                        <span><HourglassTopIcon/>Waitting...</span>
                                        :
                                        <>
                                           {currentUser.friend?.includes(paramId.userId) ?
                                                <span> <CheckIcon/>Friendly</span>
                                                :
                                                <span> <AddIcon/>Friend</span>

                                            }
                                        </>
                                    }

                                </button>
                                }
                                {currentUser.friend?.includes(paramId.userId) 
                                && 
                                <span className='icon-open-remove' onClick={()=>setOpenRemove(!openRemove)}>
                                    <ArrowDropDownIcon fontSize='large'/>
                                </span>}
                                {currentUser._id === paramId.userId 
                                ? 
                                <></>
                                :<button className='follow2' onClick={handleFollow} >
                                    {currentUser.flowing?.includes(paramId.userId) 
                                    ? <span><CheckIcon/>Unfollow</span> 
                                    :<span> <AddIcon/>Follow</span>
                                    }
                                </button> 

                                } 
                                
                               {currentUser.friend?.includes(paramId.userId) 
                                ?
                                    <>

                                  {openRemove&&
                                    <button className='follow3' onClick={handleRemove} >
                                        <span>Remove friend</span>   
                                    </button>}
                                    </>
                                    :
                                    <></>
                                }
                              
                                 
                            </div>  
                            <div className="avatar">
                                <img className='avatar-img' src={ user.userImg || noAvatar} alt={user.userImg} />
                                <button className='avatar-add-icon' onClick={()=>setOpenUploadAvt(true)}>
                                    <AddIcon fontSize='large' style={{cursor:'pointer'}} className='add-icon' />
                                    
                                </button>
                            
                            </div>
                            <h1 className="name-user">{user.username}</h1>
                            
                            <div className="profile-mid">
                                <p className='following-count'><span>{user.followUser}</span>following</p>
                                <p className='follower-count'><span>{user.follower?.length} </span>follower</p>
                                <p className='post-count'><span>{user.postCount} </span>post</p>

                            </div>
                        </div>
                        <div className="profile-bottom">
                            <div className="left">
                                <div className="introduce-item">
                                    <h1 className='introduce'>Introduce</h1>
                                    <div className="desc">
                                         <p className='desc-text' >{user.descProfile ? user.descProfile : "Write somethings about you"}</p>
                                        { openEditDesc ? 
                                        <div className="edit">
                                            <textarea name="" id="" cols="30" rows="4" value={descProfile} onChange={(e)=>setDescProfile(e.target.value)} maxLength={100} placeholder="Max 100 characters"/>
                                            <div className="edit-desc">
                                                <button className='cancel-btn' onClick={()=>setOpenEditDesc(!openEditDesc)}> Cancel</button>
                                                <button className ='update-btn' onClick={handleUpdateDesc}> Update</button>
                                            </div>

                                        </div>
                                        :
                                        <>
                                           {currentUser._id === paramId.userId 
                                            ? <button className ='edit-btn' onClick={()=>setOpenEditDesc(!openEditDesc)}> Edit</button>
                                            : <></>
                                            }
                                        </>
                                        }                                   
                                    </div>   
                                    <div className="info">
                                        <h1 className='detail'>Details</h1>

                                        <div className="info-item">
                                            <div className="info-icon">
                                                <span><EmailIcon/></span>
                                                <div className="veryfire">
                                                    <p>{user.email}</p>
                                                {user.emailVerified ?
                                                    <span  style={{color:'rgb(18, 207, 62)'}}><DoneIcon fontSize='small'/></span>
                                                    :
                                                <></>
                                                }
                                                </div>
                                            </div>
                                            {user.region &&
                                            <div className="info-icon">
                                                <span><HouseIcon/></span>
                                                <p>{user.region}</p>
                                            </div>}
                                        {user.age &&
                                            <div className="info-icon">
                                                <span><CakeIcon/></span>
                                                <p> {user.age}</p>
                                            </div>}
                                            <div className="info-icon">
                                                <span><AccessTimeFilledIcon/></span>
                                                <p>Join {user.createdAt}</p>
                                            </div>
                                            
                                            <Link to= {`/setting`} style={{textDecoration:'none'}}>
                                        {currentUser._id === paramId.userId  
                                        ?
                                            <button className="info-btn">
                                                SETTING
                                            </button>
                                            :
                                            <></>
                                            }
                                            </Link>
                                            
                                        </div>
                               
                                    </div>  
                                    <>
                                        <div className="friend-container">
                                            <Link to = {`/friend/${user._id}`} style={{textDecoration:'none'}}>
                                                <h1 className='friend'>FRIENDS  <span>{user.friend?.length}</span></h1>
                                            </Link>
                                                <div className="other">
                                                    {user.friend?.map((friendId,i)=>(
                                                        <FriendsProfile friendId={friendId} key={i}/>        
                                                    ))}
                                                </div>
                                        </div> 
                                    </>
                
                                </div>
                               
                                
                            </div>  
                            <div className="right">
                                <Feed setOpenUpload={setOpenUpload} paramId={paramId.userId}/>
                            </div>

                        
                        </div>
                                                            
                    
                    
                    
                        
                    </div>
                </div>
            </div>
            <Rightbar user = {user}/>
        </>
     );
}

export default Profile;
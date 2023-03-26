import './navbar.scss'
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import NotificationsIcon from '@mui/icons-material/Notifications';
import MessageRoundedIcon from '@mui/icons-material/MessageRounded';
import { Link } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import Search from '../../components/search/Search';
import { async } from '@firebase/util';
import axios from 'axios';
import {io} from 'socket.io-client'
import { useSelector } from 'react-redux';
import DensityMediumIcon from '@mui/icons-material/DensityMedium';
import CloseIcon from '@mui/icons-material/Close';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
function Navbar({socket, setOpenSideBarMb, openSideBarMb , openRightbar, setOpenRightbar}) {
    const  {currentPost} = useSelector((state) => state.post)
    const [openNotifi, setNotifi] = useState(false)
    const [notifications, setNotifications] = useState([])
    const noAvatar = process.env.REACT_APP_PUBLIC_FOLDER + "no_avatar1.jpg" 
    const logo = process.env.REACT_APP_PUBLIC_FOLDER + "logo.png" 
    
    // console.log(notifications)
    // useEffect(() => {
    //     const fectchNotifi = async()=>{
    //         try {
    //             const res = axios.get(`/notification/v1/get`)
    //             setNotifications(res.data)
    //         } catch (err) {
    //             console.log(err.message)
    //         }
    //     }
    //     fectchNotifi()
    // },[])
    useEffect(()=>{
        socket?.on('getNotification', data=>
          
        setNotifications((prev)=>[...prev, data])
        )
    },[socket])

    const handleOpenNotifi= ()=>{
        setNotifi(true)
        
    }
    const handleCloseNot= ()=>{
        setNotifi(false)
        setNotifications([])
        
    }
    const displayNotifications= (type)=>{
        let action
        if(type===1){
            action = 'liked'
        }
        else if(type===2){
            action = 'commented'
        }
        return action
    }


    return (  
        <div className="nav-container">
            <div className="navbar">
                <Link to="/" style={{textDecoration:'none'}}>
                    
                    <h1 className="logo"><img src={logo} alt="" />SPACE</h1>
                </Link> 
                <div className="mobile-menu">
                    <span onClick={()=>setOpenSideBarMb(!openSideBarMb)}><DensityMediumIcon/></span>
                </div>
                <Search/>
                <div className="mobile-menu">
                    <span onClick={()=>setOpenRightbar(!openRightbar)}><PeopleAltIcon/></span>
                </div>
                <div className="nav-items">
                    <div className="nav-user">
                        <div className="nav-link">
                            <button className='nav-link-btn'><MessageRoundedIcon/></button>
                            <span className='count-left'>1</span>
                            <button className='nav-link-btn' onClick={handleOpenNotifi}><NotificationsIcon/></button>
                            <span className='count-right'>{notifications?.length}</span>
                                
                        </div>
                        <div className="notifi-options">
                                   {openNotifi && 
                                   <div className="notifi-items">
                                    {
                                    notifications?.map((notification,index)=>(  
                                         <div className='items' key={index}>
                                            <img src={notification.senderImg || noAvatar} alt="" />
                                            <p> <span>{notification.senderName}</span>{displayNotifications(notification.type)} your post</p>
                                        </div>
                                  
                                    ))
                                    
                                }
                                       
                                            
                                        <button className='close-btn' onClick={handleCloseNot}>CLose</button>
                                    </div>
                                    }
                        </div>
                       
                    </div>
                </div>
            </div>
            
        </div>
    );
}

export default Navbar;
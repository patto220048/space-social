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


function Navbar({socket}) {
    const  {currentPost} = useSelector((state) => state.post)
    const [openNotifi, setNotifi] = useState(false)
    const [notifications, setNotifications] = useState([])
    const noAvatar = process.env.REACT_APP_PUBLIC_FOLDER + "no_avatar1.jpg" 
    const logo = process.env.REACT_APP_PUBLIC_FOLDER + "logo.png" 
    
    console.log(notifications)
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
                <Search/>
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
                        {/* <img src="https://images.unsplash.com/photo-1675372339768-14ed0300cd37?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwzMXx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=60" alt="" />
                        <div className="menu-icon">
                            <ArrowDropDownIcon/>
                        </div>
                        <div className="menu-options">
                            <div className="menu-items">
                                <p>hello</p>
                                <p>123</p>
                                <p>123</p>
                                <p>123</p>
                            </div>
                        </div> */}
                    </div>
                </div>
            </div>
            
        </div>
    );
}

export default Navbar;
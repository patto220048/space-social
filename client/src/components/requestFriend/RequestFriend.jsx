import axios from 'axios';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './RequestFriend.scss'
import {friend } from "../../redux/userSlice";
import { Link } from 'react-router-dom';

function RequestFriend({users}) {
    const noAvatar = process.env.REACT_APP_PUBLIC_FOLDER + "no_avatar1.jpg" 

    const dispatch = useDispatch()
    const  {currentUser} = useSelector((state) => state.user)
    const [user, setUser] = useState({})
    
    
    useEffect(()=>{
        const fecthUser = async()=>{
            
            try{
                const res = await axios.get(`/user/find/${users}`)
                setUser(res.data)
            }
            catch(err){
                console.log(err.message);
            }
        }
        fecthUser()

    },[users])

    const hanldeAccept =()=>{
        const fecthAccept= async()=>{
            
            try{
                await axios.put(`/user/accept/${user._id}`)
                dispatch(friend(user._id))
            }
            catch(err){
                console.log(err.message);
            }
        }
        fecthAccept()
    }
    const hanldeReject =()=>{
        const fecthReject= async()=>{
            
            try{
                await axios.put(`/user/reject/${user._id}`)
                alert("reject success")
              
            }
            catch(err){
                console.log(err.message);
            }
        }
        fecthReject()
    }
    
    
    return ( 
        
        <>
           { currentUser.pendding.includes(user._id) 
           ?
           <div className="suggest-friend">
                <Link to = {`/profile/${user._id}`} style={{textDecoration:'none'}}>
                   <div className="friend-items">
                        <img className="friend-img" src={user.userImg || noAvatar} alt="" />
                        <span className="friend-name">{user.username}</span>
                    </div>
                </Link>
                    <div className="button">
                        <button onClick={hanldeAccept}>Argee</button>
                        <button onClick={hanldeReject}>Reject</button>
                    </div>

            </div>
            :
            <></>
            
        }
        </>
     );
}

export default RequestFriend;
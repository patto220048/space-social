import axios from 'axios';
import { useEffect, useState } from 'react';
import './RequestFriend.scss'

function RequestFriend({users}) {
    const noAvatar = process.env.REACT_APP_PUBLIC_FOLDER + "no_avatar1.jpg" 

    const [user, setUser] = useState({})
    console.log(user._id)
    
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

    },[])

    const hanldeAccept =()=>{
        const fecthAccept= async()=>{
            
            try{
                const res = await axios.put(`/user/accept/${user._id}`)
                alert("success")
                console.log(res.data)
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
                const res = await axios.put(`/user/reject/${user._id}`)
                alert("reject success")
                console.log(res.data)
            }
            catch(err){
                console.log(err.message);
            }
        }
        fecthReject()
    }
    
    
    return ( 
            <div className="suggest-friend">
                    <div className="friend-items">
                        <img className="friend-img" src={user.userImg || noAvatar} alt="" />
                        <span className="friend-name">{user.username}</span>
                    </div>
                    <div className="button">
                        <button onClick={hanldeAccept}>Argee</button>
                        <button onClick={hanldeReject}>Reject</button>
                    </div>

                </div>
              
     );
}

export default RequestFriend;
import axios from 'axios'
import { useEffect, useState } from 'react'
import './online.scss'

function Online({users}) {
    const [friend, setFriend] = useState({})
    const noAvatar = process.env.REACT_APP_PUBLIC_FOLDER + "no_avatar1.jpg" 

    useEffect(()=>{
        const fecthUser = async()=>{
            
            try{
                const res = await axios.get(`/user/find/${users}`)
                setFriend(res.data)
            }
            catch(err){
                console.log(err.message);
            }
        }
        fecthUser()

    },[])

    
    return ( 
        <div className="online-items">
            <img className="online-img" src={friend.userImg || noAvatar} alt="" />
            <span className="status"></span>
            <span className="online-name">{friend   .username}</span>
        </div> 
     );
}

export default Online;
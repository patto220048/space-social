import axios from 'axios'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import './friendPage.scss'

function FriendPage({friendId}) {
    const [user, setUser] = useState({})
    const noAvatar = process.env.REACT_APP_PUBLIC_FOLDER + "no_avatar1.jpg" 

    useEffect(()=>{
        const fetchUser = async() =>{
            try {
                const res = await axios.get(`/user/find/${friendId}`)
                setUser(res.data)
            } catch (err) {
                console.log(err);
            }
        }
        fetchUser()
    },[friendId])
    return ( 
        <div className="friendPage-wapper">
            <Link to= {`/profile/${friendId}`} >
                <img src={user.userImg || noAvatar} alt="" className='friend-img'/> 
            </Link>
        </div>
     );
}

export default FriendPage;
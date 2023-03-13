import './friends.scss'
import Friend from '../../components/friend/Friend';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';



function Friends() {
    const paramId = useParams()
    const [user, setUser] = useState({})

    useEffect(()=>{

        const fetchUser = async() =>{
            try {
                const res = await axios.get(`/user/find/${paramId.friendId}`)
                setUser(res.data)
            } catch (err) {
                console.log(err);
            }
        }
        fetchUser()

    },[paramId.friendId])

    return (
        <div className="container-friend">
            <div className="container-friend">

                {
                    user.friend?.map((friendId, i)=>(
                        <Friend friendId={friendId} key={i}/>
                    ))
                }
                  
            </div>
        </div>
      );
}

export default Friends;  
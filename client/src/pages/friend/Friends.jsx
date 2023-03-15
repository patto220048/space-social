import './friends.scss'
import Friend from '../../components/friend/Friend';
import { Link, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';



function Friends({type}) {
    const paramId = useParams()
    const [user, setUser] = useState({})
    const [activeTab, setActiveTab] = useState(0)

    const tagsList = [{
        name: "FRIEND",
        link : '/friend' 
    },{
        name: "FOLLOWER",
        link : '/follower' 
    },{
        name: "FOLLOWING",
        link : '/following'
    }]

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
            <div className="tags">
            {tagsList.map((btn, index)=>(
                <Link to ={`${btn.link}/${paramId.friendId}`} key={index}>
                <button className={"tags-btn "+ (activeTab=== index && 'active')} onClick={()=>setActiveTab(index)}>{btn.name}</button>
                </Link>
            ))}
            </div>
            <div className="container-friend">
                {type === 'friend' 
                    &&
                    user.friend?.map((friendId, i)=>(
                    <Friend friendId={friendId} key={i}/>))
                    ||
                    type==="follower"
                    &&
                    user.follower?.map((friendId, i)=>(
                    <Friend friendId={friendId} key={i}/>))
                    ||
                    type==="following"
                    &&
                    user.flowing?.map((friendId, i)=>(
                        <Friend friendId={friendId} key={i}/>
                    
                    ))
                }
            </div>
        </div>
      );
}

export default Friends;  
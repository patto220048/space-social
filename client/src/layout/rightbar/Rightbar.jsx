
import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Online from "../../components/onlineUser/Online";
import RequestFriend from "../../components/requestFriend/RequestFriend";
import "./rightbar.scss"
function Rightbar() {
    const  {currentUser} = useSelector((state) => state.user)
    return ( 
        <div className="rightbar-container">
            <div className="rightbar-wapper">
                    {currentUser.pendding?.map((users,i)=>(
                        <RequestFriend users={users} key={i}/>
                    ))}
            </div>
            <div className="user-online">
             
                <h1 className="user-online-name">Online</h1>
             
                {currentUser.friend?.map((users,i)=>(
                    <Online users={users} key={i} /> 
                ))}
            </div>
          
        </div>
     );
}

export default Rightbar;
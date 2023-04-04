
import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Online from "../../components/onlineUser/Online";
import RequestFriend from "../../components/requestFriend/RequestFriend";
import "./rightbar.scss"
function Rightbar({openRightbar}) {
    
    const  {currentUser} = useSelector((state) => state.user)
    return ( 
        <div className={"rightbar-container "+( openRightbar ? 'active' : <></>)}>
           { currentUser.pendding.length > 0 && <h1 >REQEST FRIENDS</h1>}
            <div className="rightbar-wapper">
                    {currentUser.pendding?.map((users,i)=>(
                        <RequestFriend users={users} key={i}/>
                    ))}
            </div>
            <h1 className="user-online-name">ONLINE</h1>
            <div className="user-online">
                {currentUser.friend?.map((users,i)=>(
                    <Online users={users} key={i} /> 
                ))}
            </div>
          
        </div>
     );
}

export default Rightbar;
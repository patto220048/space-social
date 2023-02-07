import "./sidebar.scss"
import HomeIcon from '@mui/icons-material/Home';
import GroupIcon from '@mui/icons-material/Group';
import ChatIcon from '@mui/icons-material/Chat';
import SettingsIcon from '@mui/icons-material/Settings';
import HelpIcon from '@mui/icons-material/Help';
import LogoutIcon from '@mui/icons-material/Logout';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import NightlightRoundIcon from '@mui/icons-material/NightlightRound';

import Contents from "../contents/Contents";
import { useState } from "react";

function Sidebar({setlectItem,setSetlectItem}) {
    const [active, setActive] = useState()
    const listTop = [{icon :<HomeIcon/>, span : "HOME" },
                    { icon :<AccountCircleIcon/>, span : "PROFILE" },
                    { icon :<GroupIcon/>, span : "FRIEND" },
                    { icon :<ChatIcon/>, span : "MESSAGE" },
                    { icon : <SettingsIcon/>, span : "SETTING" },
                    { icon :<HelpIcon/> , span : "HELP" },
                    { icon : <LogoutIcon/> , span : "LOGOUT" },
                    { icon :<NightlightRoundIcon/>, span : " LIGHTMODE" }]
    
    return ( 
        <div className="wapper-sidebar">
            <div className="sidebar">
                <div className="sidebar-item">
                    <div className="top-side" > 
                        {listTop.map((item,index)=>
                            <div className={"top " + (active === index ? "active" : "none" )} onClick={() =>setActive(index)} >
                                <div className="top-icon">
                                    {item.icon}
                                </div>
                                <span>{item.span}</span>
                            </div>
                        )}
                    </div>
              
                </div>
                <div className="touch">  
                </div>
                {/* <div className="mobie">

                </div> */}

            </div>
            <div className="contents">
                <Contents/>
                
            </div>
        </div>
     );
}

export default Sidebar;